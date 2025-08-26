const express = require("express");
const router = express.Router();
const {eventService, fetcheventDetails,fetchTickets,confirmTicket,} = require('../controller/eventController');
const {createUser,updateUser,deletUser,getUsers} = require("../controller/userController")


router.post("/abc",eventService);
router.get("/event-details/:code",fetcheventDetails)
router.post("/get-tickets",fetchTickets);
router.get("/confirm-ticket",confirmTicket);
router.post("/reg-user",createUser);
router.put("/update-user/:employeeId",updateUser);
router.delete("/delete-user/:employeeId",deletUser);
router.get("/get-users",getUsers);

module.exports = router;