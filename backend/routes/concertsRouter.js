const { Router } = require("express");
const { eventSchema } = require("../db/db");

const concertsRouter = Router();

// Create a new concert (requires authentication)
concertsRouter.get("/create", (req, res, next) => {
  res.send("Create concerts");
});
// Fetch concerts created by the logged-in host
concertsRouter.get("/my", (req, res, next) => {
  res.send("My registered concerts");
});
// Update concert details
concertsRouter.get(":conId/update", (req, res, next) => {
  res.send("Update concert details");
});
// Delete a concert
concertsRouter.get(":conId/delete", (req, res, next) => {
  res.send("Delete concert details");
});

// fetch all available concerts
concertsRouter.get("/", (req, res, next) => {
  res.send("fetch all available concerts");
});
concertsRouter.get("/:conId", (req, res, next) => {
  res.send("Fetch details of a specific concert");
});

module.exports = {
  concertsRouter,
};
