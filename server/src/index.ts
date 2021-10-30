import app from "./app";

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Server listening on at http://localhost:${PORT}`);
});
