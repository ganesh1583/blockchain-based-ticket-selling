const { Router } = require("express");
const { userModel, nonceModel } = require("../db/db");
const { jwt } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const usersRouter = Router();

usersRouter.post("/signup", async (req, res, next) => {
  const { username, walletAddress, signature } = req.body;
  const nonce_val = await nonceModel.findOne({
    wallet_address: walletAddress,
  });

  const nonce = nonce_val.nonce_value;
  console.log(nonce);
  if (!nonce) return res.status(400).json({ error: "Nonce not found" });

  try {
    const recoveredAddress = ethers.verifyMessage(nonce, signature);

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res
        .status(401)
        .json({ error: "Invalid signature! Could not sign you up" });
    }
    // res.json({message: "created"});
    await userModel.create({
        user_id: 1,
      username: username,
      wallet_address: walletAddress,
    });

    await nonceModel.deleteOne({
      wallet_address: walletAddress,
    });

    res.json({
      message: "You are signed up"
    });
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
});

usersRouter.post("/signin", async (req, res, next) => {
  const { walletAddress, signature } = req.body;
  const nonce_val = await nonceModel.findOne({
    wallet_address: walletAddress,
  });

  if (!nonce_val) return res.status(400).json({ error: "Nonce not found" });
  const nonce = nonce_val.nonce_value;

  if (!nonce) return res.status(400).json({ error: "Nonce not found" });

  try {
    const recoveredAddress = ethers.verifyMessage(nonce, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const token = jwt.sign({ walletAddress }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await nonceModel.deleteOne({
      wallet_address: walletAddress,
    });

    res.json({
      token: token,
    });
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
});

usersRouter.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

usersRouter.get("/:wallet_address", async (req, res, next) => {
  try {
    const { wallet_address } = req.params;
    if (!wallet_address)
      return res.status(400).json({ error: "Wallet address required" });

    const userData = await userModel.findOne({
      wallet_address: wallet_address,
    });

    if (!userData) {
      return res.status(404).json(null); // Return null if no user is found
    }

    res.json({ userData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error.", description: error.message });
  }
});

usersRouter.post("/nonce", async (req, res, next) => {
  try {
    const { wallet_address } = req.body;
    if (!wallet_address)
      return res.status(400).json({ error: "Wallet address required" });

    const nonce = Math.floor(Math.random() * 1000000).toString();
    await nonceModel.create({
      wallet_address: wallet_address,
      nonce_value: nonce,
    });

    res.json({ nonce });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error.", description: error.message });
  }
});
usersRouter.delete("/delete", async (req, res, next) => {
  try {
    const { wallet_address } = req.body;
    if (!wallet_address)
      res.status(404).json({ message: "please provide wallete address!" });
    await nonceModel.findOneAndDelete({
      wallet_address,
    });

    res.status(200).json({ message: "nonce deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
module.exports = {
  usersRouter: usersRouter,
};
