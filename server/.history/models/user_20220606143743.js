const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: [{ type: String }],
  info: { company_name: String, address: String, city: String, state: String, zip: String, phone_number: String },
});

module.exports = mongoose.model("User", UserSchema);
