const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    mobileNo: {
        type : Number,
        required: true
    },
    employeeID :{
        type : Number,
        required: true
    },
    designation:{
        type : String,
        required: true
    },
    joiningDate:{
        type : Date,
        required : true
    }
})

const Employee = mongoose.model("Employee",employeeSchema,"employees")

module.exports = Employee;