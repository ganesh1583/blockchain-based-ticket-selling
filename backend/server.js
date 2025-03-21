const expess = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = expess();
app.use(expess.json())

async function  main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(process.env.PORT)
    console.log("Listening on port 5000")
}

app.get('/', (req,res, next)=>{
    res.send('Hello')
})

main()