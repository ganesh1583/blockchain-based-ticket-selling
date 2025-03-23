const { Router } = require("express");
const { ticketModel } = require("../db/db");

const ticketsRouter = Router();

// Buy a ticket (wallet address required, triggers NFT minting)
ticketsRouter.post("/buy", async (req, res, next) => {
  const { ticket_id, event_id, wallet_address, token_id } = req.body;
  if (!ticket_id || !event_id || !wallet_address || !token_id)
    res.status(404).json("Please provide require all fields!");
  const newTicket = await ticketModel.create({
    ticket_id,
    event_id,
    wallet_address,
    token_id,
  });
  res
    .status(200)
    .json({ message: "Ticket generated successfully!", newTicket });
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