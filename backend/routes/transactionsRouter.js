const { Router } = require("express");

const transactionsRouter = Router();

// Fetch transaction history of a user
transactionsRouter.get("/:wallet_address", (req, res, next) => {
  const wallet_address = req.params.wallet_address;
  res.send("transaction wallet Address:", wallet_address);
});

// Fetch transactions for a specific concert
transactionsRouter.post("/:concert_id", (req, res, next) => {
  const concert_id = req.params.concert_id;
  res.send("concert id is:", concert_id);
});

module.exports = {
  transactionsRouter,
};
