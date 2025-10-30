const express = require('express');
const mongoose = require("mongoose");
const opinion_routes = require("./route.js");

const app = express();
const PORT = 8080;
const url = "mongodb://127.0.0.1:27017/opiniondb";

app.use(express.json());

app.use("/opinion", opinion_routes );

app.use("/",(req,res) => {
    try{
        return res.status(200).send("REQUEST SEND SUCCESSFULLY.");
    }catch(error){
        return res.status(500).send("SERVER NOT CONNECTED.");
    }
})

app.listen(PORT, async() => {
    await mongoose.connect(url).then(() => console.log("mongodb connected")).catch(err => console.log("error: ", err));
    console.log("server is running at http://localhost:8080");
})




