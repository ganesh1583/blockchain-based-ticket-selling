const { Router } = require("express");
const { ticketModel, userModel } = require("../db/db");
const {userMiddleware} = require("../middlewares/userMiddleware");
const uploadJsonToPinata = require("../comman_functions/upload")
const ticketsRouter = Router();

async function getTicketId() {
  const maxUser = await ticketModel.findOne().sort({ ticket_id: -1 }).limit(1);
  const maxUserId = maxUser ? ticketModel.ticket_id : 0; // Default to 0 if no users exist
  return maxUserId + 1;
}


// Buy a ticket (wallet address required, triggers NFT minting)
ticketsRouter.post("/buy", userMiddleware, async (req, res, next) => {
  try {
    const { event_id } = req.body;
    const ticket_id = await getTicketId();
    const walletAddress = req.walletAddress;

    const userData = await userModel.find({
      wallet_address: walletAddress,
    });
    const userId = userData.user_id;
    
    // Upload the JSON to Pinata and get the CID
    const CID = await uploadJsonToPinata({ ticket_id, event_id, userId });

    // Create the ticket in the database
    const newTicket = await ticketModel.create({
      ticket_id,
      event_id,
      wallet_address: walletAddress,
    });

    // Return success response with CID
    res.status(200).json({ message: "Ticket generated successfully!", newTicket, CID });
  } catch (error) {
    console.error("Error creating ticket:", error);
    next(error); // Pass error to the error handler middleware
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