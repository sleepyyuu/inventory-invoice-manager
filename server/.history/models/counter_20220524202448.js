const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  name: { type: String, required: true },
  counter: { type: Number, required: true },
});

module.exports = mongoose.model("Buyer", BuyerSchema);
