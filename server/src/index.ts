import express from "express";

import { getId } from "./shorten";

const app = express();
const port = 8080;

app.get("/", (_, res) => {
    res.send(getId());
});

app.listen(port, () => {
    console.log(`Server listening on at http://localhost/${port}`);
});