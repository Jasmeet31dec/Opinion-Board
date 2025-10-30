const express = require("express");
const { default: mongoose } = require("mongoose");
const opinions = require("../model/opinion.js");
const opinion_routes = express.Router();

const url = "mongodb://127.0.0.1:27017/opiniondb";

mongoose.connect(url).then(() => console.log("connected"));

//get all opinions
opinion_routes.get("/", async (req, res) => {
  try {
    const getOpinions = await opinions.find({});
    res.status(200).send(getOpinions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Add new opinion
opinion_routes.post("/", async (req, res) => {
  try {
    const newOpinion = new opinions(req.body);
    const result = await newOpinion.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//most voted opinons sorting
opinion_routes.get("/mostVoted", async (req, res) => {
  try {
    const popularOpinions = await opinions
      .find({})
      .sort({ votes: -1 }); // descending order
      
    res.status(200).send(popularOpinions);
  } catch (error) {
    res.status(500).json({message: 'could not fetch sorted data'});
  }
});

//latest opinions
opinion_routes.get('/latest', async (req, res) => {
  try {
    const newestOpinions = await opinions.find({})
      .sort({ createdAt: -1 });
      
    console.log(newestOpinions);
    res.status(200).json(newestOpinions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch newest opinions' });
  }
});

/*
//upvote or downvote
opinion_routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { action, userId } = req.body;

  if (!["upvotes", "downvotes"].includes(action)) {
    return res
      .status(500)
      .json({ error: 'Invalid action. Use "upvote" or "downvote".' });
  }
  const increment = action === "upvotes" ? 1 : -1;

  const opinion = await opinions.findOne({ _id: id });
  console.log(opinion.action);
  let alreadyVoted;
  if (action === "upvotes") {
    alreadyVoted = opinion.upvotes.includes(userId);
  } else {
    alreadyVoted = opinion.downvotes.includes(userId);
  }

  if (!alreadyVoted) {
    try {
      const result = await opinions.updateOne(
        { _id: id },
        { $inc: { votes: increment } }
      );
      if (action === "upvotes") {
        await opinions.updateOne(
          { _id: id },
          { $addToSet: { upvotes: userId } }
        );
      } else {
        await opinions.updateOne(
          { _id: id },
          { $addToSet: { downvotes: userId } }
        );
      }

      res.json({ message: `${action} successful`, result });
    } catch (err) {
      res.status(500).json({ error: "Database error", details: err.message });
    }
  } else {
    res.status(400).json({ msg: `already ${action}` });
  }
});
*/

module.exports = opinion_routes;

opinion_routes.put("/:id/upvotes", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const opinion = await opinions.findOne({ _id: id });

  alreadyUpVoted = opinion.upvotes.includes(userId);
  alreadyDownVoted = opinion.downvotes.includes(userId);

  //upvoting
  if (alreadyDownVoted) {
    try {
      const result = await opinions.updateOne(
        {
          _id: id,
        },
        {
          $pull: { downvotes: userId },
        }
      );
      await opinions.updateOne({ _id: id }, { $addToSet: { upvotes: userId } });
      res.status(405).json({ message: "upvoted successfully", result });
    } catch (error) {
      console.log("not able to remove from downvotes.");
    }
  } else if (!alreadyUpVoted) {
    try {
      const result = await opinions.updateOne(
        { _id: id },
        { $inc: { votes: 1 } }
      );
      await opinions.updateOne({ _id: id }, { $addToSet: { upvotes: userId } });
      res.json({ message: "upvoted successfully", result });
    } catch (error) {
      console.log("not upvoted");
    }
  } else {
    res.status(400).json({ msg: "already upvoted" });
  }
});

opinion_routes.put("/:id/downvotes", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const opinion = await opinions.findOne({ _id: id });

  alreadyUpVoted = opinion.upvotes.includes(userId);
  alreadyDownVoted = opinion.downvotes.includes(userId);

  //downvoting
  if (alreadyUpVoted) {
    try {
      const result = await opinions.updateOne(
        {
          _id: id,
        },
        {
          $pull: { upvotes: userId },
        }
      );
      await opinions.updateOne(
        { _id: id },
        { $addToSet: { downvotes: userId } }
      );
      res.status(405).json({ message: "downvoted successfully", result });
    } catch (error) {
      console.log("not able to remove from upvotes.");
    }
  } else if (!alreadyDownVoted) {
    try {
      const result = await opinions.updateOne(
        { _id: id },
        { $inc: { votes: -1 } }
      );
      await opinions.updateOne(
        { _id: id },
        { $addToSet: { downvotes: userId } }
      );
      res.json({ message: "downvoted successfully", result });
    } catch (error) {
      console.log("not upvoted");
    }
  } else {
    res.status(400).json({ msg: "already downvoted" });
  }
});
