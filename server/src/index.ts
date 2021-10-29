import express from "express";
import bodyParser from "body-parser";

import { getId } from "./shorten";
import Database from "./db";
import { url } from "inspector";

const db = new Database();

const app = express();
app.use(bodyParser.text());

const port = 8081;

app.post("/add", (req, res) => {
    const long = req.body;

    const url = db.add(long);
    res.send(url);
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
