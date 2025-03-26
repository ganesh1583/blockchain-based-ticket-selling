const { Router } = require("express");
const { ticketModel } = require("../db/db");
const userMiddleware = require("../middlewares/userMiddleware");

const ticketsRouter = Router();

// Buy a ticket (wallet address required, triggers NFT minting)
ticketsRouter.post("/buy", userMiddleware, async (req, res, next) => {
  try {
    const { ticket_id, event_id, wallet_address, token_id } = req.body;

    // Check if all required fields are provided
    if (!ticket_id || !event_id || !wallet_address || !token_id) {
      return res.status(400).json({ message: "Please provide all required fields!" });
    }

    // Optionally check for duplicates (if necessary)
    const existingTicket = await ticketModel.findOne({ ticket_id });
    if (existingTicket) {
      return res.status(409).json({ message: "Ticket already exists!" });
    }

    // Create new ticket
    const newTicket = await ticketModel.create({
      ticket_id,
      event_id,
      wallet_address,
      token_id,
    });

    // Return success response
    res.status(200).json({ message: "Ticket generated successfully!", newTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    // Pass error to the error handler middleware (for centralized error handling)
    next(error);
  }
});

ticketsRouter.get("/:wallet_address", async (req, res, next) => {
    try{
        const wallet_address = req.params.wallet_address;
        const ticketInfo = await ticketModel.find({wallet_address});
        if(!ticketInfo) res.status(404).json({message: "Ticket not found!"})
        res.status(200).json(ticketInfo)
    }catch(error){
        res.status(500).json({error: "Internal server error!", details: error.message})
    }
});

module.exports = {
  ticketsRouter,
};

// thike by gn check kr ke jata hu tab tak kr tu
// han good night TC