import supertest from "supertest";
import app from "../src/app";
import Database from "../src/Database";

const agent = supertest(app);

jest.mock("../src/Database");

describe("app", () => {

    const entry = {
        id: "entry id",
        url: "entry url"
    };
    const DatabaseMock = Database as jest.MockedClass<typeof Database>;

    beforeEach(() => {
        jest.clearAllMocks();

        DatabaseMock.prototype.add.mockReturnValue(entry);
        DatabaseMock.prototype.get.mockReturnValue(entry);
    });

    describe("/add", () => {
        it("should add body to database and respond with id", async () => {
            const url = "https://www.myurl.com/my/url/route?with=queryparams&number=123";
            const response = await agent
                .post("/add")
                .set("Content-Type", "text/plain")
                .send(url);

            expect(response.status).toEqual(200);
            expect(response.text).toEqual(entry.id);

            expect(DatabaseMock.prototype.add).toHaveBeenCalledTimes(1);
            expect(DatabaseMock.prototype.add).toHaveBeenCalledWith(url);
        });

        it("should respond with 400 if url is malformed", async () => {
            const url = "malformed url";
            const response = await agent
                .post("/add")
                .set("Content-Type", "text/plain")
                .send(url);

            expect(response.status).toEqual(400);
            expect(response.text).toEqual("Malformed URL");

            expect(DatabaseMock.prototype.add).not.toHaveBeenCalled();
        });
    });

    describe("/:id", () => {
        it("should respond with url from database", async () => {
            const id = "id";
            const response = await agent.get(`/${id}`);

            expect(response.status).toEqual(200);
            expect(response.text).toEqual(entry.url);

            expect(DatabaseMock.prototype.get).toHaveBeenCalledTimes(1);
            expect(DatabaseMock.prototype.get).toHaveBeenCalledWith(id);
        });

        it("should resopnd with 404 if id not found in database", async () => {
            DatabaseMock.prototype.get.mockImplementationOnce(() => {
                throw new Error();
            });

            const id = "id";
            const response = await agent.get(`/${id}`);

            expect(response.status).toEqual(404);
            expect(response.text).toEqual("ID not found");

            expect(DatabaseMock.prototype.get).toHaveBeenCalledTimes(1);
            expect(DatabaseMock.prototype.get).toHaveBeenCalledWith(id);
        });
    });
});