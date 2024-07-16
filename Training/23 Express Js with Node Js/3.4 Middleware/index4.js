import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const dirName = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var firstName = "";
var secondName = "";
var randomBandName = "";

//This solution will also work, but check solution4.js as well, that will also work.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(dirName + "/public/index.html");
});

app.post("/submit", (req,res) => {
  firstName = req.body.street;
  secondName = req.body.pet;
  randomBandName = firstName + secondName + "👌";
  res.send("<h1>Your band name is</h1>" +  `<p> ${randomBandName}</p>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
