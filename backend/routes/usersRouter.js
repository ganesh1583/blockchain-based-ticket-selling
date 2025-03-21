const { Router } = require('express')
const { userModel } = require("../db/db");

const usersRouter = Router();

// Register a new host (username, password, wallet)
usersRouter.post('/signup', async (req,res, next) => {
    const { username, wallet_address } = req.body;
    try {
        await userModel.create({
            username: username,
            wallet_address: wallet_address
        })
    } catch (e) {
        console.error(e);
    }
})

// Authenticate host with username/password or wallet
usersRouter.post('/signin', (req,res,next) => {
    res.send("Login user")
})
// Logout host
usersRouter.post('/logout', (req,res,next) => {
    res.send("Logout user");
})

usersRouter.post('/nonce', (req, res, next) => {

})

module.exports = {
    usersRouter: usersRouter
}