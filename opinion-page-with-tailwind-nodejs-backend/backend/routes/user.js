const express  = require("express");
const { default: mongoose } = require("mongoose");
const user_routes = express.Router();

const { handleUserSignup,handleUserLogin } = require('../controllers/user');

const url = "mongodb://127.0.0.1:27017/opiniondb";

mongoose.connect(url).then(() => console.log("connected"));

//adding new user
user_routes.post("/signup", handleUserSignup);

//checking user authentication
user_routes.put("/login", handleUserLogin);

module.exports = user_routes;