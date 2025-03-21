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
    description: String,
    date: { type: Date, required: true },
    total_tickets: Number,
    ticket_price: Number,
    contract_address: String,
    created_at: { type: Number, default: (new Date()).getTime() }
})

const ticketSchema = new Schema({
    ticket_id: {type: Number, required: true},
    concert_id: {type: ObjectId, ref: "eventModel"},
    wallet_address: String,
    token_id: Integer,
    purchase_date: Date,
})

const transactionSchema = new Schema({
    transaction_id : {type: Number, unique: true},
    wallet_address: String,
    concert_id: {type: ObjectId, ref: "eventModel"},
    amount_paid: Integer,
    transaction_hash: String,
    timestamp: { type: Number, default: (new Date()).getTime() }
})

const userModel = mongoose.model("user", userSchema);
const eventModel = mongoose.model("event", eventSchema);
const ticketModel = mongoose.model("ticket",ticketSchema);
const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports({
    userModel: userModel,
    eventModel: eventModel,
    ticketModel: ticketModel,
    transactionModel: transactionModel
})