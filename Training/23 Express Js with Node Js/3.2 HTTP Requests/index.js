import express from 'express';
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.get("/about", (req, res) => {
    res.send("This page was created to learn about Express with node.");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Name's Satyam, contact me using @Knighteye</h1>");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});