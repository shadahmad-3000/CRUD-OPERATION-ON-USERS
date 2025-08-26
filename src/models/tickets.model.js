const mongoose = require("mongoose");
const moment = require("moment")

const ticketSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    childCount: {
        type: Number,
        required: true
    },
    adultCount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    billSummary: {
        childBill: String,
        adultBill: String,
        totalAmount: Number,
        ticketNumber: Number
    }
})

const Tickets = mongoose.model("Tickets", ticketSchema, "tickets");

module.exports = Tickets;