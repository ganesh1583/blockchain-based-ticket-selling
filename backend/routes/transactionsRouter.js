const { Router } = require("express");

const transactionsRouter = Router();

// Fetch transaction history of a user
transactionsRouter.get("/:wallet_address", (req, res, next) => {
  const wallet_address = req.params.wallet_address;
  res.send("transaction wallet Address:", wallet_address);
});
// Fetch transactions for a specific concert
transactionsRouter.post("/:concet_id", (req, res, next) => {
  const concet_id = req.params.concet_id;
  res.send("concert id is:", concet_id);
});

module.exports = {
  transactionsRouter,
};
