import express from "express";

const app = express();
const port = 3000;

// This is the custom defined middleware.
// We have created a new anonymous function here.
// And assigned it to logger variable, which will be
// the name of our middleware. This middleware is create
// to log the Request method and request url.
var logger = (req, res, next) =>{
  console.log("Request Method: " +  req.method + " Request url: " +  req.url);
  next();
};

app.use(logger);

app.get("/", (res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
