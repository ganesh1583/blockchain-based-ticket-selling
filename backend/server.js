const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

// const { usersRouter } = require("./routes/usersRouter")
const app = express();
app.use(express.json())

app.get('/', (req,res, next)=>{
    res.send("Hello")
})
// app.use("/api/auth/register", usersRouter)

async function  main() {
    // await mongoose.connect(process.env.MONGO_URL)
    app.listen(process.env.PORT)
    console.log("Listening on port 5000")
}

main()