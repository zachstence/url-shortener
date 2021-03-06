import Database from "../src/Database";
import {mocked} from "ts-jest/utils";
import { JsonDB } from "node-json-db";
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import {getId, parseUrl} from "../src/util";

jest.mock("node-json-db");
jest.mock("node-json-db/dist/lib/JsonDBConfig");
jest.mock("../src/util");

describe("db", () => {
    let db: Database;
    const SEP = "/";
    const filename = "filename";

    const id = "id";
    const inputUrl = "inputUrl";
    const parsedUrl = "https://test.com/some/url?with=queryparams";
    const outputUrl = "outputUrl";
    const JsonDBMock = JsonDB as jest.MockedClass<typeof JsonDB>;

    const JsonDBConstructorMock = mocked(JsonDB, true);
    const ConfigConstructorMock = mocked(Config, true);
    const getIdMock = mocked(getId, true);
    const toUrlMock = mocked(parseUrl, true);

    beforeEach(() => {
        jest.clearAllMocks();
        db = new Database(filename);

        getIdMock.mockReturnValue(id);
        toUrlMock.mockReturnValue(parsedUrl);

        JsonDBMock.prototype.getObject.mockReturnValue(outputUrl);
    });

    it("should create a new database in 'db.json' with proper config", () => {
        expect(ConfigConstructorMock).toHaveBeenCalledTimes(1);
        expect(ConfigConstructorMock).toHaveBeenCalledWith(filename, true, true, SEP);
        expect(JsonDBConstructorMock).toHaveBeenCalledTimes(1);
    });

    describe("add()", () => {
        it("should add a new id-url relationship to the database", () => {
            const url = db.add(inputUrl);

            expect(url).toEqual({id: id, url: outputUrl});

            expect(getIdMock).toHaveBeenCalledTimes(1);
            expect(toUrlMock).toHaveBeenCalledTimes(1);
            expect(toUrlMock).toHaveBeenCalledWith(inputUrl);

            expect(JsonDBMock.prototype.exists).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.exists).toHaveBeenCalledWith(SEP + id);
            
            expect(JsonDBMock.prototype.push).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.push).toHaveBeenCalledWith(SEP + id, parsedUrl);

            expect(JsonDBMock.prototype.getObject).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.getObject).toHaveBeenCalledWith(SEP + id);
        });

        it("should regenerate the id if it already exists", () => {
            JsonDBMock.prototype.exists.mockReturnValueOnce(true);
            JsonDBMock.prototype.exists.mockReturnValueOnce(false);

            db.add(inputUrl);

            expect(getIdMock).toHaveBeenCalledTimes(2);

            expect(JsonDBMock.prototype.exists).toHaveBeenCalledTimes(2);
            expect(JsonDBMock.prototype.exists).toHaveBeenCalledWith(SEP + id);
        });
    });

    describe("get()", () => {
        it("should return Url if id exists in the database", () => {
            const url = db.get(id);

            expect(url).toEqual({id: id, url: outputUrl});

            expect(JsonDBMock.prototype.getObject).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.getObject).toHaveBeenCalledWith(SEP + id);
        });

        it("should throw an error if id does not exist in the database", () => {
            JsonDBMock.prototype.getObject.mockImplementation(() => {
                throw new Error();
            });

            expect(() => db.get(id)).toThrow();
        });
    });

    describe("delete()", () => {
        it("should delete and return a Url from the database if it exists", () => {
            const url = db.delete(id);

            expect(url).toEqual({id: id, url: outputUrl});

            expect(JsonDBMock.prototype.getObject).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.getObject).toHaveBeenCalledWith(SEP + id);

            expect(JsonDBMock.prototype.delete).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.delete).toHaveBeenCalledWith(SEP + id);
        });

        it("should throw an error if id does not exist in the database",  () => {
            JsonDBMock.prototype.getObject.mockImplementation(() => {
                throw new Error();
            });

            expect(() => db.delete(id)).toThrow();
        });
    });
});