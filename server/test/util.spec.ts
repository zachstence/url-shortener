import {getId, parseUrl} from "../src/util";

describe("id", () => {
    describe("getId", () => {
        it("should return random 6 character string", () => {
            const id1 = getId();
            const id2 = getId();
            const id3 = getId();
            const id4 = getId();

            expect(id1.length).toEqual(6);
            expect(id2.length).toEqual(6);
            expect(id3.length).toEqual(6);
            expect(id4.length).toEqual(6);

            expect(id1).not.toEqual(id2);
            expect(id1).not.toEqual(id3);
            expect(id1).not.toEqual(id4);
            expect(id2).not.toEqual(id3);
            expect(id2).not.toEqual(id4);
            expect(id3).not.toEqual(id4);
        });

        it("should return an id including only alphanumeric characters", () => {
            const NUM_CHECKS = 10;
            for (let i = 0; i < NUM_CHECKS; i++) {
                const id = getId();
                for (let c = 0; c < id.length; c++) {
                    expect(id.charAt(c)).toEqual(expect.stringMatching(/[A-Za-z0-9]/));
                }
            }
        });
    });

    describe("toUrl", () => {
        it("should return URL for properly formed string", () => {
            const url = parseUrl("https://www.github.com/zachstence");
            expect(url).toEqual("https://www.github.com/zachstence");
        });

        it("should append https protocol if no protocol given", () => {
            const url = parseUrl("www.github.com/zachstence");
            expect(url).toEqual("https://www.github.com/zachstence");
        });

        it("should throw if URL is malformed", () => {
            expect(() => parseUrl("malformed url")).toThrow();
        });
    });
});