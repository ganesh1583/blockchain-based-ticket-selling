const { Router } = require("express");
const { eventModel } = require("../db/db");
const { userMiddleware } = require("../middlewares/userMiddleware");
const concertsRouter = Router();

// Create a new concert (requires authentication)
concertsRouter.post("/create", async (req, res, next) => {
  try {
    const {
      event_id,
      event_name,
      description,
      event_date,
      duration,
      total_tickets,
      ticket_price,
      wallet_address,
      building,
      area,
      city,
      state,
      pincode,
    } = req.body;

    if (
      !event_id ||
      !event_name ||
      !event_date ||
      !duration ||
      !total_tickets ||
      !ticket_price
    ) {
      return res.status(404).json({ error: "Missing required fields" });
    }
    const newEvent = await eventModel.create({
      event_id,
      event_name,
      description,
      event_date,
      duration,
      total_tickets,
      ticket_price,
      wallet_address,
      venue: {
        building,
        area,
        city,
        state,
        pincode,
      },
    });
    res
      .status(201)
      .json({ message: "Event created successfully!", event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server Error!", details: error.message });
    next(error); // Pass error to Express error handler
  }
});


// Fetch concerts created by the logged-in host
concertsRouter.get("/:wallet_address", async (req, res, next) => {
  try {
    const wallet_address = req.params.wallet_address;
    const eventData = await eventModel.find({
      wallet_address: wallet_address,
    });
    if (!eventData) res.status(404).json({ message: "No data found!" });
    res.status(200).json({ eventData: eventData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal server error", details: error.message });
  }
});


// Update concert details
concertsRouter.patch("/:event_id", async (req, res, next) => {
  try {
    const event_id = req.params.event_id;
    const updateFields = req.body;
    const updatedEvent = await eventModel.findOneAndUpdate(
      { event_id: event_id },
      { $set: updateFields },
      { new: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ error: "Event not found!" });
    res.status(200).json({ updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal server error", details: error.message });
  }
});



// Delete a concert
concertsRouter.delete("/:event_id", async (req, res, next) => {
  try {
    const event_id = req.params.event_id;
    const eventInfo = await eventModel.deleteOne({ event_id });
    if (!eventInfo) res.status(404).json({ message: "Event not found!" });
    res.status(200).json({ message: "Event deleted Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error!", details: error.message });
  }
});


// fetch all available concerts
concertsRouter.get("/", async (req, res, next) => {
  try {
    const eventsData = await eventModel.find();
    if (!eventsData) res.status(404).json({ message: "No event found!" });
    res.status(200).json(eventsData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error!", details: error.message });
  }
});



concertsRouter.get("/:conId", (req, res, next) => {
  res.send("Fetch details of a specific concert");
});



module.exports = {
  concertsRouter,
};
