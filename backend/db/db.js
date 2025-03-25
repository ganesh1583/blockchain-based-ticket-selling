const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    user_id: { type: Number, unique: true, required: true },
    username: { type: String, required: true },
    wallet_address: { type: String, unique: true, required: true },
    created_at: { type: Date, default: Date.now }
});

const eventSchema = new Schema({
    event_id: { type: Number, unique: true, required: true },
    host_id: { type: ObjectId, ref: "user" },
    event_name: { type: String, required: true },
    description: { type: String, required: true },
    event_date: { type: Date, required: true },
    duration: { type: Number },
    total_tickets: { type: Number, required: true },
    ticket_price: { type: Number, required: true },
    wallet_address: { type: String, required: true },
    venue: {  
        building: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    created_at: { type: Date, default: Date.now }
});

const ticketSchema = new Schema({
    ticket_id: { type: Number, unique: true, required: true },
    event_id: { type: ObjectId, ref: "event" }, //changed it from concert_id => event_id
    wallet_address: { type: String, required: true },
    token_id: { type: Number, unique: true, required: true },
    purchase_date: { type: Date, default: Date.now },
    cid: { type: String, required: true}
});

const transactionSchema = new Schema({
    transaction_id: { type: Number, unique: true, required: true },
    wallet_address: { type: String, required: true },
    event_id: { type: ObjectId, ref: "event" }, //changed it from concert_id => event_id
    amount_paid: { type: Number, required: true },
    transaction_hash: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const nonceSchema = new Schema({
    wallet_address: { type: String, required: true },
    nonce_value: { type: Number, required: true }
});

const userModel = mongoose.model("user", userSchema);
const eventModel = mongoose.model("event", eventSchema);
const ticketModel = mongoose.model("ticket", ticketSchema);
const transactionModel = mongoose.model("transaction", transactionSchema);
const nonceModel = mongoose.model("nonce", nonceSchema);

module.exports = {
    userModel,
    eventModel,
    ticketModel,
    transactionModel,
    nonceModel
};