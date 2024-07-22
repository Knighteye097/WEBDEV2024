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
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];


async function getAllUser() {
  const result = await db.query("SELECT * FROM endUser");
  users = result.rows;
}

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visitedCountry");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function addUser(data) {
  await db.query("INSERT INTO endUser (name, color) VALUES ($1, $2)", [data.name, data.color])
  await getAllUser();
}

async function getCountries(data) {
  console.log("GET COUNTRIES METHOD START");

  const color = await getUserColor(data);
  
  const validCountryData = await db.query("SELECT visitedcountry_id FROM user_country_link WHERE user_id = $1", [data]);
  const validIds = [];
  validCountryData.rows.forEach(
    row => (validIds.push(row.visitedcountry_id)
  ));
  
  let countries = []
  const result = await db.query("SELECT country_code FROM visitedCountry WHERE id = ANY($1::int[])", [validIds]);
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  
  console.log("GET COUNTRIES METHOD END");
  return {
    color: color,
    countries : countries
  };
}

async function getUserColor(data) {
  console.log("GET COLOR METHOD START");
  const result = await db.query("SELECT color from enduser where id = $1", [data]);
  console.log("GET COLOR METHOD END");
  return result.rows[0].color;
}

async function addCountryForSpecificUser(countryCode){
  console.log("ADD COUNTRY FOR SPECIFIC USER METHOD START");
  const result = await db.query("SELECT * FROM visitedcountry WHERE country_code = $1", [countryCode]);
  let countryIdToLink;
  if(result.rows == ''){
    await db.query("INSERT INTO visitedcountry (country_code) VALUES ($1)", [countryCode]);
    const queryResult = await db.query("SELECT id FROM visitedcountry WHERE country_code = $1", [countryCode]); 
    countryIdToLink = queryResult.rows[0].id;
  } 
  else{
    countryIdToLink = result.rows[0].id;
  }
  await db.query("INSERT INTO user_country_link (user_id, visitedcountry_id) VALUES ($1, $2)", [currentUserId, countryIdToLink]);
  console.log("ADD COUNTRY FOR SPECIFIC USER METHOD END");
  return await getCountries(currentUserId);
}


app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  await getAllUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});

// User Clicks on the add button, to add country to a particular member.
app.post("/add", async (req, res) => {
  console.log(req.body);
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    const countryCode = result.rows[0].country_code;
    try {
      console.log("COUNTRY TO BE ADDED IS: " + countryCode);
      let responseToRender =  await addCountryForSpecificUser(countryCode);
      res.render("index.ejs", {
        countries: responseToRender.countries,
        total: responseToRender.countries.length,
        users: users,
        color: responseToRender.color,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

//User clicking on "add family member" or any of the user button on homepage
app.post("/user", async (req, res) => {
  console.log("/user request METHOD START");
  const request = req.body;
  if('add' in request){
    res.render("new.ejs");
  }
  else if('user' in request){
    console.log("COUNTRIES FOR USER WITH Id: " + request.user);
    currentUserId = parseInt(request.user);
    let responseToRender = await getCountries(currentUserId);
    await getAllUser();
    console.log("/user request METHOD END");
    res.render("index.ejs", {
      countries: responseToRender.countries,
      total: responseToRender.countries.length,
      users: users,
      color: responseToRender.color,
    });
  } else{
    res.redirect("/");
  } 
});

//User on add new user page clicks on add button
app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  await addUser(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
