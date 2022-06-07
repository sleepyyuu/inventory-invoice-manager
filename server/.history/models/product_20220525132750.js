const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number },
});

ProductSchema.virtual("url").get(function () {
  return "/product/" + this._id;
});
module.exports = mongoose.model("Product", ProductSchema);
