import app from "./app";

app.listen(process.env.port || 8081, () => {
    console.log(`Server listening on at http://localhost:${PORT}`);
});
