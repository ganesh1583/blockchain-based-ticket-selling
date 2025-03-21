const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    user_id: {type: String, unique: true},
    username: {type: String, unique: true},
    wallet_address: String,
})

