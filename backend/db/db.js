const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    user_id: {type: Number, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    wallet_address: String,
    created_at: { type: Number, default: (new Date()).getTime() },
})

const eventSchema = new Schema({
    event_id: {type: Number, required: true},
    host_id: {type: ObjectId, ref: "userModel"},
    name: String,
    // event_img: {},
    description: String,
    event_date: { type: Date, required: true },
    duration: {type: Number},
    total_tickets: Number,
    ticket_price: Number,
    wallet_address: String,//used in userSchema so use from there
    venue: {  
        building: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    created_at: { type: Number, default: (new Date()).getTime() }
})

const ticketSchema = new Schema({
    ticket_id: {type: Number, required: true},
    concert_id: {type: ObjectId, ref: "eventModel"},
    wallet_address: String,
    token_id: Number,
    purchase_date: Date,
})

const transactionSchema = new Schema({
    transaction_id : {type: Number, unique: true},
    wallet_address: String,
    concert_id: {type: ObjectId, ref: "eventModel"},
    amount_paid: Number,
    transaction_hash: String,
    timestamp: { type: Number, default: (new Date()).getTime() }
})

const nonceSchema = new Schema({
    wallet_address: {type: String, unique: true},
    nonce_value: Number
})

const userModel = mongoose.model("user", userSchema);
const eventModel = mongoose.model("event", eventSchema);
const ticketModel = mongoose.model("ticket",ticketSchema);
const transactionModel = mongoose.model("transaction", transactionSchema);
const nonceModel = mongoose.model("nonce", nonceSchema);

module.exports = {
    userModel: userModel,
    eventModel: eventModel,
    ticketModel: ticketModel,
    transactionModel: transactionModel,
    nonceModel: nonceModel
}