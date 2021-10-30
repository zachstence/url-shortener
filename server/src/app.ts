import express from "express";
import cors from "cors";

import Database from "./Database";

const filename = process.env.DB_FILENAME;
if (!filename) throw new Error();

const db = new Database(filename);

const app = express();
app.use(express.text());
app.use(cors({origin: "http://localhost:8080"}));

const URL_REGEX = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

app.post("/add", (req, res) => {
    const url = req.body as string;

    if (url.match(URL_REGEX)) {
        const entry = db.add(url);
        res.status(200).send(entry.id);
    } else {
        res.status(400).send("Malformed URL");
    }
});

app.get("/:id", (req, res) => {
    const {id} = req.params;

    try {
        const entry = db.get(id);
        res.status(200).send(entry.url);
    } catch (e) {
        res.status(404).send("ID not found");
    }
});

export default app;