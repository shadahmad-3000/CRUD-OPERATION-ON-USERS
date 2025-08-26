const Event = require("../models/event.model");
const httpStatus = require("http-status");
const Tickets = require("../models/tickets.model");
const moment = require("moment")

const eventDetails = async (param) => {
    try {
        const { code } = param;
        if(!code){
            throw new Error("Code Not Found");
        }
        const eventData = await Event.findOne({ code: code });
        console.log("Data found: ", eventData)
        if (eventData) {
            return {
                status: httpStatus.status.OK,
                message: "Fair Data Fetched Successfully",
                fairData: eventData
            }
        }
    } catch (error) {
        console.error(error?.message || error, "Internal Server Error");
        return {
            status: 500,
            message: "Error Detected",
        }
    }
}

const createEventService = async (body) => {
    try {
        console.log("Body: ", body);
        const { name, code, description, childFare, adultFare, maxCount, dates } = body;
        if (!name || !code || !description || !childFare || !adultFare || !maxCount || !dates) {
            throw error("All fields are must be Provided");
        }

        const eventToCreate = {
            name,
            code,
            description,
            childFare,
            adultFare,
            maxCount,
            dates
        }
        const event = await Event.create(eventToCreate);
        console.log("Fair Created", event);
        return {
            stauts: httpStatus.CREATED,
            message: "fair Created Successfully",
            fairData: event

        }
    } catch (error) {
        console.error(error?.message || error) || "Error Detected";
        return {
            status: 500,
            message: "Internal Server error"
        }
    }
}

//let ticketNumber = 1;

const MAX_COUNT = 10;
const child_Price = 30;
const adult_Price = 70;

const bookTicket = async (body) => {
    try {
        console.log("Body: ", body);
        const { name, email, mobile, childCount, adultCount, date } = body;
        if (!name || !email || !mobile || !childCount || !adultCount || !date) {
            throw error("All paramaters must be provided");
        }
        
        const childCountNum = Number(childCount);
        const adultCountNum = Number(adultCount)
        const totalPerson = childCountNum + adultCountNum;

        if (totalPerson <= 0) {
            throw new error("At least one ticket should be booked");
        }
        if (totalPerson > MAX_COUNT) {
            throw new Error(`Max ${MAX_COUNT} tickets can be booked at once`);
        }

        const bookingDate = moment(date, "YYYY-MM-DD");
        const today = moment().startOf("day");

        if (!bookingDate.isValid()) {
            throw new Error("Invalid date format, must be YYYY-MM-DD");
        }

        if (bookingDate.isBefore(today)) {
            throw new Error("Booking date must be today or in future");
        }

        const totalTickets = await Tickets.countDocuments();
        const ticketNumber = totalTickets + 1;
        //calculate bill
        const childBill = childCount * child_Price;
        const adultBill = adultCount * adult_Price;
        const totalAmount = childBill + adultBill;

        // to go in db i.e why we create this
        const ticketsToCreate = {
            name,
            email,
            mobile,
            childCount,
            adultCount,
            date,
            billSummary: {
                childBill: `${childCount} * ${child_Price}  = ${childBill}`,
                adultBill: `${adultCount} * ${adult_Price}  = ${adultBill}`,
                totalAmount,
                ticketNumber
            }
        };

        const ticket = await Tickets.create(ticketsToCreate);
        console.log("Tickets Created", ticket);
        return {
            status: httpStatus.OK,
            message: "Ticket bill Fetched Successfully",
            Data: ticket
        }

    } catch (error) {
        console.error(error?.message || error, "Internal Server Error");
        return {
            status: 500,
            message: "Error Detected",
        }
    }
}
const confirmTicketService = async (query) => {
  try {
    const { ticketNo } = query;

    // find in Tickets collection by ticketNumber inside billSummary
    const ticket = await Tickets.findOne({ "billSummary.ticketNumber": ticketNo });

    if (!ticket) {
      return {
        status: 404,
        message: "Ticket Not Found"
      };
    }

    // prepare QR data
    const qrData = {
      name: ticket.name,
      email: ticket.email,
      mobile: ticket.mobile,
      date: ticket.date,
      totalAmount: ticket.billSummary.totalAmount,
      noOfPeople: Number(ticket.childCount) + Number(ticket.adultCount)
    };

    // convert to base64
    const base64Data = Buffer.from(JSON.stringify(qrData)).toString("base64");

    // generate qr link
    const qrLink = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${base64Data}`;

    return {
      status: 200,
      message: "Ticket Confirmed Successfully",
      qrLink,
      qrData,
    };
  } catch (error) {
    console.error(error?.message || error,"Error in confirmTicketService:");
    return {
      status: 500,
      message: "Oops! Internal Server Error"
    };
  }
};

module.exports = {
    createEventService,
    eventDetails,
    bookTicket,
    confirmTicketService
}