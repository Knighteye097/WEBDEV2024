import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "satyamkkh";
const yourPassword = "satyam123";
const yourAPIKey = "317c481f-7416-4dd4-aa10-dead8c1e75bc";
const yourBearerToken = "32fa2f69-5f4e-4f6d-b6f1-3b464b8cea54";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", {content : result});
  } catch(error){
    console.error("Failed to make the request: " + error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
 try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", {content: result});
 } catch(error) {
  console.error("Failed to make the request: " + error.message);
 }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try{
      const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
      const result = JSON.stringify(response.data);
      res.render("index.ejs", {content:result});
  } catch(error) {
    console.error("Failed to make the request: " + error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 try{
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42" , {
        headers: {
          Authorization : `Bearer ${yourBearerToken}`
        }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", {content : result});
 } catch(error) {
  console.error("Failed to make the request: " + error.message);
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
