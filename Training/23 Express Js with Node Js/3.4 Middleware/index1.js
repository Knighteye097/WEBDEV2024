import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// This method is called before any of the route handlers
// like get, put, post... inside the method firstly we give
// the middleware name(bodyParser) and then the type of data
// we want to parse which in our case is "urlencoded" since
// it is coming from post request. extended : true is a obligatory
// parameter.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit" , (req,res) => {
  console.log(req.body)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
