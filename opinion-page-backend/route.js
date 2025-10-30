const express  = require("express");
const { default: mongoose } = require("mongoose");
const opinions = require("./model/opinion.js");
const opinion_routes = express.Router();

const url = "mongodb://127.0.0.1:27017/opiniondb";

mongoose.connect(url).then(() => console.log("connected"));

// Add new opinion
opinion_routes.post("/", async (req, res) => {
  try {
    const newOpinion = new opinions(req.body);
    const result = await newOpinion.save();
    console.log("newOpinion", result);
    res.status(201).send("success");
  } catch (error) {
    res.status(400).send("error");
  }
});

opinion_routes.get("/", async (req,res) => {
  try{
    const getOpinions = await opinions.find({});
    console.log(getOpinions);
    res.status(200).json(getOpinions);
  }catch(error){
    res.status(500).json({"error" : error});
  }
});

module.exports = opinion_routes;