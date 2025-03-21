const {Router} = require('express');
const { userMiddleware } = require("../middlewares/userMiddleware")


const ticketsRouter = Router();

// Buy a ticket (wallet address required, triggers NFT minting)
ticketsRouter.post("/buy", (req,res,next) => {
    res.send("Buy a ticket (wallet address required, triggers NFT minting)");
})
ticketsRouter.post('/:wallet_address', (req,res,next) => {
    const wallet_address = req.params.wallet_address;
    res.json({"message": `wallet address: ${wallet_address}`});
})

module.exports = {
    ticketsRouter
}