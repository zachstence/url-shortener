import Database from "../src/db";
import {mocked} from "ts-jest/utils";
import { JsonDB } from "node-json-db";
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import {getId} from "../src/id";

jest.mock("node-json-db");
jest.mock("node-json-db/dist/lib/JsonDBConfig");
jest.mock("../src/id");

describe("db", () => {
    let db: Database;
    const SEP = "/";

    const id = "id";
    const inputUrl = "inputUrl";
    const outputUrl = "outputUrl";
    const ConfigMock = Config as jest.MockedClass<typeof Config>;
    const JsonDBMock = JsonDB as jest.MockedClass<typeof JsonDB>;

    const JsonDBConstructorMock = mocked(JsonDB, true);
    const ConfigConstructorMock = mocked(Config, true);
    const getIdMock = mocked(getId, true);

    beforeEach(() => {
        jest.clearAllMocks();
        db = new Database();

        getIdMock.mockReturnValue(id);

        JsonDBMock.prototype.getObject.mockReturnValue(outputUrl);
    });

    it("should create a new database in 'db.json' with proper config", () => {
        expect(ConfigConstructorMock).toHaveBeenCalledTimes(1);
        expect(ConfigConstructorMock).toHaveBeenCalledWith("db.json", true, true, SEP);
        expect(JsonDBConstructorMock).toHaveBeenCalledTimes(1);
    });

    describe("add()", () => {
        it("should add a new id-url relationship to the database", () => {
            const url = db.add(inputUrl);

            expect(url).toEqual({id: id, url: outputUrl});

            expect(getIdMock).toHaveBeenCalledTimes(1);

            expect(JsonDBMock.prototype.exists).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.exists).toHaveBeenCalledWith(SEP + id);
            
            expect(JsonDBMock.prototype.push).toHaveBeenCalledTimes(1);
            expect(JsonDBMock.prototype.push).toHaveBeenCalledWith(SEP + id, inputUrl);

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

            try {
                db.get(id);
                fail("db.get should've thrown an error");
            } catch (error) {
                expect(error).toBeDefined();
            }
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

            try {
                db.delete(id);
                fail("db.get should've thrown an error");
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });
});