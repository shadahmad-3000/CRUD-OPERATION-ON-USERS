const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    childFare: {
        type: Number,
        required: true
    },
    adultFare: {
        type: Number,
        required: true
    },
    maxCount: {
        type: Number,
        required : true
    },
    dates: {
        type:[String],
        required: true
    }
})

const Event = mongoose.model("Event", eventSchema, "events");

module.exports = Event;