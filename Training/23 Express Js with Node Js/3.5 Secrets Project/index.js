//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const dirName = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var password;
var passwordExtractor = (req, res, next) => {
    password = req.body["password"];
    if(password === "ILoveProgramming")
        next();
    else
        res.sendFile(dirName + "/public/index.html");
};

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passwordExtractor);

app.get("/", (req,res) => {
    res.sendFile(dirName + "/public/index.html");
});

app.post("/check", (req,res) => {
    res.sendFile(dirName + "/public/secret.html");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})