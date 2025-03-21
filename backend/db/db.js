const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    user_id: {type: Number, unique: true},
    username: {type: String, unique: true},
    wallet_address: String,
    created_at: { type: Number, default: (new Date()).getTime() },
})

const eventSchema = new Schema({
    event_id: Number,
    host_id: {type: mongoose.Schema.Types.Number, ref: "User"},
    name: String,

})