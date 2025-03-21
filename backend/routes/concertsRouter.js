const { Router } = require("express");
const { eventSchema } = require("../db/db");
const { userMiddleware } = require("../middlewares/userMiddleware")
const concertsRouter = Router();

// Create a new concert (requires authentication)
concertsRouter.post("/create",userMiddleware, (req, res, next) => {
  res.send("Create concerts");
});

// Fetch concerts created by the logged-in host
concertsRouter.get("/my",userMiddleware, (req, res, next) => {
  res.send("My registered concerts");
});

// Update concert details
concertsRouter.put(":conId/update",userMiddleware, (req, res, next) => {
  res.send("Update concert details");
});

// Delete a concert
concertsRouter.delete(":conId/delete",userMiddleware, (req, res, next) => {
  res.send("Delete concert details");
});

// fetch all available concerts
concertsRouter.get("/", (req, res, next) => {
  res.json({
    message: "You are here"
  })
});
concertsRouter.get("/:conId", (req, res, next) => {
  res.send("Fetch details of a specific concert");
});

module.exports = {
  concertsRouter,
};
