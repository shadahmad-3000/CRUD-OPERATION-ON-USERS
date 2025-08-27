const express = require("express");
const router = express.Router();
const {eventService, fetcheventDetails,fetchTickets,confirmTicket,} = require('../controller/eventController');
const {createUser,updateUser,deletUser,getUsers} = require("../controller/employeeController")
const taskController = require('../controller/taskController');


router.post("/abc",eventService);
router.get("/event-details/:code",fetcheventDetails)
router.post("/get-tickets",fetchTickets);
router.get("/confirm-ticket",confirmTicket);
router.post("/reg-user",createUser);
router.put("/update-user/:employeeId",updateUser);
router.delete("/delete-user/:employeeId",deletUser);
router.get("/get-users",getUsers);
router.route("/status").get(taskController.serviceStatus);
router.route("/create-task").post(taskController.createTask);
router.route("/get-task/:id").get(taskController.getTask);
router.route("/update-task/:id").put(taskController.updateTask);
router.route("/delete-task/:id").delete(taskController.deleteTask);

module.exports = router;