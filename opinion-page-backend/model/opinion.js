const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
    name:{type:String },
    title:{type:String },
    opinion:{type:String },
    votes:{type: Number},
});

const opinions = mongoose.model("opinions",opinionSchema);

module.exports = opinions;