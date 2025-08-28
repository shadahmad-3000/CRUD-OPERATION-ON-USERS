const express = require("express");
const router = express.Router();
const {eventService, fetcheventDetails,fetchTickets,confirmTicket,} = require('../controller/eventController');
const {createEmp,updateEmp,deleteEmp,getEmps} = require("../controller/employeeController")
const {sentOtp,verifyOtp} = require("../controller/otpController")
const taskController = require('../controller/taskController');


router.post("/abc",eventService);
router.get("/event-details/:code",fetcheventDetails)
router.post("/get-tickets",fetchTickets);
router.get("/confirm-ticket",confirmTicket);
router.post("/reg-user",createEmp);
router.put("/update-user/:employeeId",updateEmp);
router.delete("/delete-user/:employeeId",deleteEmp);
router.get("/get-users",getEmps);
router.post("/sent-otp",sentOtp);
router.post("/verify-otp",verifyOtp);
router.route("/status").get(taskController.serviceStatus);
router.route("/create-task").post(taskController.createTask);
router.route("/get-task/:id").get(taskController.getTask);
router.route("/update-task/:id").put(taskController.updateTask);
router.route("/delete-task/:id").delete(taskController.deleteTask);

module.exports = router;