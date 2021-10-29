import express from "express";
import { getId } from "./shorten";
import Database from "./db";

const db = new Database();

const app = express();
const port = 8081;

app.get("/", (_, res) => {
    db.add(getId(), new Date().toLocaleTimeString());
});

app.listen(port, () => {
    console.log(`Server listening on at http://localhost:${port}`);
});
