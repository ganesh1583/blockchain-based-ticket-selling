const { Router } = require("express");
const { eventModel } = require("../db/db");
const { userMiddleware } =require("../middlewares/userMiddleware")
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
      return res.status(400).json({ error: "Missing required fields" });
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
    next(error); // Pass error to Express error handler
  }
});
// Fetch concerts created by the logged-in host
concertsRouter.get("/:wallet_address", async (req, res, next) => {
  const wallet_address = req.params.wallet_address;
  const eventData = await eventModel.find({
    wallet_address: wallet_address
  })
  if(!eventData)
    res.status(500).json({message: "No data found!"});
  res.status(200).json({eventData: eventData})
});
// Update concert details
concertsRouter.put(":conId/update", (req, res, next) => {
  const { event_name, description, duration, building, area, city, state, pincode} = req.body;

  if(!event_name || !description || !duration || !building || !area || !city || !state || !pincode)
  res.send("Update concert details");

});
// Delete a concert
concertsRouter.delete(":conId/delete", (req, res, next) => {
  res.send("Delete concert details");
});

// fetch all available concerts
concertsRouter.get("/", (req, res, next) => {
  res.json({
    message: "You are here",
  });
});
concertsRouter.get("/:conId", (req, res, next) => {
  res.send("Fetch details of a specific concert");
});

module.exports = {
  concertsRouter,
};
