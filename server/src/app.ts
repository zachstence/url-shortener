import express from "express";
import cors from "cors";

import Database from "./Database";

const filename = process.env.DB_FILENAME;
if (!filename) throw new Error("Please provide a filename for the database via the environment variable DB_FILENAME.");

const db = new Database(filename);

const app = express();
app.use(express.text());

const origin = process.env.NODE_ENV === "development" ? `http://localhost:8080` : `https://zachstence.github.io`
app.use(cors({origin}));

/**
 * POST /add, plain text URL in body
 * Generates and adds an ID to the database associated with the given URL. Responds with the new ID.
 * Responds with 400 if the URL is malformed.
 */
app.post("/add", (req, res) => {
    try {
        const entry = db.add(req.body);
        res.status(200).send(entry.id);
    } catch {
        res.status(400).send("Malformed URL");
    }
});

/**
 * GET /:id, 6-digit alphanumeric ID
 * Reads the URL from the database associated with the given ID. Responds with the URL.
 * Responds with 404 if the ID does not exist in the database.
 */
app.get("/:id", (req, res) => {
    try {
        const {id} = req.params;
        const entry = db.get(id);
        res.status(200).send(entry.url);
    } catch {
        res.status(404).send("ID not found");
    }
});

/**
 * DELETE /:id, 6-digit alphanumeric ID
 * Deletes the URL from the database associated with the given ID. Responds with the URL.
 * Responds with 404 if the ID does not exist in the database.
 */
 app.delete("/:id", (req, res) => {
    try {
        const {id} = req.params;
        const entry = db.delete(id);
        res.status(200).send(entry.url);
    } catch {
        res.status(404).send("ID not found");
    }
});


export default app;