const service = require("../service/otpService");

const sentOtp = async (req,res) => {
    const resp = await service.sentOtpService(req.body);
    res.send(resp);
}

const verifyOtp = async (req, res) => {
    const resp = await service.verifyOtpService(req.body);
    res.send(resp);
}

module.exports ={
    sentOtp,
    verifyOtp
}