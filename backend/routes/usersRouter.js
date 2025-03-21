const { Router } = require('express')

const { userSchema } = require("../db/db");

const usersRouter = Router();

// Register a new host (username, password, wallet)
usersRouter.get('/signup', (req,res, next)=>{
    res.send("Register");
})
// Authenticate host with username/password or wallet
usersRouter.get('/signin', (req,res,next) => {
    res.send("Login user")
})
// Logout host
usersRouter.get('/logout', (req,res,next)=>{
    res.send("Logout user");
})

module.exports = {
    usersRouter: usersRouter
}