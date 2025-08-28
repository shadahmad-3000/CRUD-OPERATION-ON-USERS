const httpStatus = require("http-status")
const transport = require("../utils/mailer");

let otpStore = {}; // empty object to store otp

const sentOtpService = async (body) => {
    try {
        const { email } = body;
        if (!email) {
            throw new Error("Email is Required!!");
        }
        // it will generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000) // floor is used to nearest digit integer 

        otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };//send otp for 5 minutes

        const mailOption = {
            from: '"FromMyApplication"<YourEmail@gmail.com>',
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}. Valid for 5 minutes.`
        }
        const mail = await transport.sendMail(mailOption); //sendMail() is a function in nodemailer
        console.log("Mail sent", mail);
        return {
            status: httpStatus.OK,
            message: `OTP sent to ${email}`,
            data: email
        }
    } catch (error) {
        console.error("Error in Send OTP ", error?.message || error?.data || error);
        return {
            status: httpStatus.Error,
            message: "Failed to send OTP"
        }
    }
}
const verifyOtpService = async (body) => {
    try {
        const {email, otp} = body;
        if(!email || !otp ){
            throw new Error("Email and OTP is required");
        }
        const record = otpStore[email];

        if(!record){
            return{
                status : httpStatus.status.BAD_REQUEST,
                message: "No OTP sent to this mail"
            }
        }
        if (Date.now() > record.expires) {
            return { 
                status: 400, 
                message: "OTP expired!" 
            };
        }
        if (parseInt(otp) === record.otp) {
            delete otpStore[email]; // clear after success
            return { 
                status: 200, 
                message: "OTP verified successfully" 
            };
        } else {
            return { 
                status: 400, 
                message: "Invalid OTP" 
            };
        }
    } catch (error) {
        console.error("Error in verifyOtpService:", error?.message || error);
        return {
            status: 500,
            message: "Failed to verify OTP",
        };
    }
}
module.exports = {
    sentOtpService,verifyOtpService
}