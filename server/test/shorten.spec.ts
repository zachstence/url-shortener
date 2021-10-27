import {describe, it, expect} from "@jest/globals";
import {getId} from "../src/shorten";

describe("shorten", () => {

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

        it("should not return an id including only alphanumeric characters", () => {
            const NUM_CHECKS = 10;
            for (let i = 0; i < NUM_CHECKS; i++) {
                const id = getId();
                for (let c = 0; c < id.length; c++) {
                    expect(id.charAt(c)).toEqual(expect.stringMatching(/[A-Za-z0-9]/));
                }
            }
            
        });

    });

});