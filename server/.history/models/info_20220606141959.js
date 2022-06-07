const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InfoSchema = new Schema({
  company_name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  phone_number: { type: String },
});

module.exports = mongoose.model("Info", InfoSchema);
