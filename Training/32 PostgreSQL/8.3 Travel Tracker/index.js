import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "password",
  port: 5432
});


db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  var countries = await checkVisisted();
  res.render("index.ejs", {
    total : countries.length,
    countries : countries
  });
});

app.post("/add", async(req,res) => {
  const country = req.body.country;
  try{
    let resultCodeFromCountries = await db.query("SELECT country_code from countries where country_name LIKE '%' || $1 || '%'", [country]);
    resultCodeFromCountries = resultCodeFromCountries.rows[0].country_code;
    console.log(resultCodeFromCountries);
    try{
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [resultCodeFromCountries]);
      res.redirect("/");
    } catch(error){
      var countries = await checkVisisted();
      res.render("index.ejs", {
        total: countries.length,
        countries: countries,
        error: "Country has been already added, try again"});
    }
  } catch (error) {
    var countries = await checkVisisted();
    res.render("index.ejs", {
      total: countries.length,
      countries: countries,
      error: "Country does not exist try again"});
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
