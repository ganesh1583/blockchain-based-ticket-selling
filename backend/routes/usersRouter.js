const { Router } = require('express')
const { v4: uuidv4 } = require("uuid");

const { userSchema } = require("../db/db");

const usersRouter = Router();

// Register a new host (username, password, wallet)
usersRouter.post('/signup', (req,res, next)=>{
    res.send("Register");
})
// Authenticate host with username/password or wallet
usersRouter.post('/signin', (req,res,next) => {
    res.send("Login user")
})
// Logout host
usersRouter.post('/logout', (req,res,next)=>{
    res.send("Logout user");
})

module.exports = {
    usersRouter: usersRouter
}