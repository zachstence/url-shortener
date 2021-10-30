import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Database from "./Database";

const db = new Database();

const app = express();
app.use(bodyParser.text());
app.use(cors({
    origin: "http://localhost:8080"
}));

const port = 8081;

const URL_REGEX = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

app.post("/add", (req, res) => {
    const url = req.body as string;

    if (url.match(URL_REGEX)) {
        const entry = db.add(url);
        res.send(entry.id);
    } else {
        res.status(400);
        res.send("Malformed URL");
    }
});

app.get("/:id", (req, res) => {
    const {id} = req.params;

    try {
        const entry = db.get(id);
        res.send(entry.url);
    } catch (e) {
        res.status(404);
        res.send("ID not found");
    }
});

app.listen(port, () => {
    console.log(`Server listening on at http://localhost:${port}`);
});
