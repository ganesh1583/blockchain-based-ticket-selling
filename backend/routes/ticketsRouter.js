const {Router} = require('express');

const ticketsRouter = Router();

// Buy a ticket (wallet address required, triggers NFT minting)
ticketsRouter.post("/buy", (req,res,next) => {
    res.send("Buy a ticket (wallet address required, triggers NFT minting)");
})
ticketsRouter.get('/:wallet_address', (req,res,next) => {
    const wallet_address = req.params.wallet_address;
    res.json({"message": `wallet address: ${wallet_address}`});
})

module.exports = {
    ticketsRouter
}