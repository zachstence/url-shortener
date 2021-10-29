import express from "express";
import bodyParser from "body-parser";

import Database from "./db";

const db = new Database();

const app = express();
app.use(bodyParser.text());

const port = 8081;

const URL_REGEX = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

app.post("/add", (req, res) => {
    const long = req.body as string;

    if (long.match(URL_REGEX)) {
        const url = db.add(long);
        res.send(url);
    } else {
        res.sendStatus(400);
    }
});

app.get("/:id", (req, res) => {
    const {id} = req.params;

    try {
        const url = db.get(id);
        res.redirect(url.url);
    } catch (e) {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Server listening on at http://localhost:${port}`);
});
