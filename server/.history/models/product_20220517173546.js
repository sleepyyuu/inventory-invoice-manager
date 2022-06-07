const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price_range_min: { type: Number },
  price_range_max: { type: Number },
});

ProductSchema.virtual("url").get(function () {
  return "/product/" + this._id;
});
module.exports = mongoose.model("Product", ProductSchema);
