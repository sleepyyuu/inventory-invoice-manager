const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BuyerSchema = new Schema({
  company_name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number },
  phone_number: { type: String },
});

module.exports = mongoose.model("Buyer", BuyerSchema);
