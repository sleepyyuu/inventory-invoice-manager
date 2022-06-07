const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price_range_min: { type: Number },
  price_range_max: { type: Number },
  buyer_prices: [{ buyer: String, price: Number }],
  quantity: { type: Number },
});

ProductSchema.virtual("url").get(function () {
  return "/product/" + this._id;
});
module.exports = mongoose.model("Product", ProductSchema);
