var express = require("express");
var app = express();
var indexRouter = require("./routes/index");
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'uh475yhf9204odg',
  baseURL: 'http://localhost:3000',
  clientID: 'erm4U9eqoyuTepGbFvaFSCgPrZF6d3bB',
  issuerBaseURL: 'https://dev-8c172k4g8h4ugh58.us.auth0.com',
  // authRequired: false,
  // auth0Logout: true,
  // secret: process.env.SECRET,
  // baseURL: process.env.BASEURL,
  // clientID: process.env.CLIENTID,
  // issuerBaseURL: process.env.ISSUER,
  clientSecret: 'pGTsjNLbCJqw4m-APtJgs7d9z1NQ6P6BLWugZbcgcsJ5Tx9tnX8_7FWznAykBeTB',
  authorizationParams: {
    response_type: 'code',
    audience: 'http://localhost:5000',
    scope: 'openid profile email'
  }
};



app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use("/", indexRouter);

var port = 3000;

app.listen(3000, () => {
    console.log(`App is running on ${port}`);
})
