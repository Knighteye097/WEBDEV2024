import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  password: "password",
  host: "localhost",
  database: "secrets",
  port: 5432
});
let isUserAuthenticated = false;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function addUser(email, password){
  const query = "INSERT INTO users (username , password) VALUES ($1, $2)";
  const values = [email, password];

  await db.query(query, values);
}

async function checkUser(email, password){
  const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const values = [email, password];

  const result = await db.query(query, values);
  console.log(result);
  if(result.rows == ''){
    isUserAuthenticated = false;
  } else {
    isUserAuthenticated = true;
  }
};

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  await addUser(email, password);
  res.render("secrets.ejs");
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  await checkUser(email,password);
  if(isUserAuthenticated){
    res.render("secrets.ejs");
  } else {
    res.render("login.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
