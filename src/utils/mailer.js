const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "mohdshadahmad786@gmail.com",
        pass: "hyosqmvecxzgxbsf"
    },
})

module.exports = transport;