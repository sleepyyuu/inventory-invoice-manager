const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: [{ type: String }],
  info: [company_name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    phone_number: { type: String },]
});

module.exports = mongoose.model("User", UserSchema);
