const fileService = require("../service/eventService");

const eventService = async (req, res) => {
    const resp = await fileService.createEventService(req.body);
    res.send(resp);
}

const fetcheventDetails = async (req,res) => {
    const resp = await fileService.eventDetails(req.params);
    res.send(resp);
}

const fetchTickets = async (req,res) => {
    const resp = await fileService.bookTicket(req.body);
    res.send(resp);
}
const confirmTicket = async (req,res) => {
    const resp = await fileService.confirmTicketService(req.query);
    res.send(resp);
}

module.exports ={
    eventService,
    fetcheventDetails,
    fetchTickets,
    confirmTicket
}