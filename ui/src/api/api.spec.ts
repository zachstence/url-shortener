import axios from "axios";
import { mocked } from "ts-jest/utils";

jest.mock("axios");

describe("api", () => {

    // it("should set proper baseURL when NODE_ENV is development", () => {
    //     const OLD_ENV = process.env;
    //     jest.resetModules() // Most important - it clears the cache
    //     process.env = { ...OLD_ENV }; // Make a copy
        
    //     // @ts-expect-error I know what I'm doing
    //     process.env.NODE_ENV = "development"
        

    //     process.env = OLD_ENV; // Restore old environment
    // });

    let api: {add: CallableFunction; get: CallableFunction};
    const url = "url";
    const id = "id";

    const axiosMock = mocked(axios, true);

    beforeEach(async () => {
        axiosMock.create.mockReturnValue(axiosMock);

        api = await import("./api");
    });

    describe("add", () => {
        it("should send proper POST request and return response", async () => {
            axiosMock.post.mockResolvedValue({data: id});

            const actual = await api.add(url);

            expect(actual).toEqual(id);

            expect(axiosMock.post).toHaveBeenCalledTimes(1);
            expect(axiosMock.post).toHaveBeenCalledWith("/add", url, {
                headers: {
                    "Content-Type": "text/plain"
                }
            });
        });
    });

    describe("get", () => {
        it("should send proper GET request and return response", async () => {
            axiosMock.get.mockResolvedValue({data: url});

            const actual = await api.get(id);

            expect(actual).toEqual(url);

            expect(axiosMock.get).toHaveBeenCalledTimes(1);
            expect(axiosMock.get).toHaveBeenCalledWith(`/${id}`);
        });
    });
});