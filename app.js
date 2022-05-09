
//This is the page that will handle the creation of the server on a local host port:3500

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const PORT = 3500;

require("dotenv").config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static("static"));
app.use(expressLayouts);

app.use(cookieParser("RecipeAppSecure"));
app.use(session({
    secret: 'RecipeAppSecretSession',
    saveUninitialized: true,
    resave: true
  }));
  app.use(flash());
  app.use(fileUpload());

app.set("layout", "./Layouts/main");
app.set("view engine", "ejs");

const routes = require("./Server/Routes/recipeRoutes.js")
app.use('/', routes);

app.listen(PORT, ()=> console.log(`Listening to port ${PORT}`));