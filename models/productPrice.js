const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductPriceSchema = new Schema({
  products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  buyer: { type: Schema.Types.ObjectId, ref: "Buyer", required: true },
  price: { type: Number, required: true },
  details: { type: String },
});

module.exports = mongoose.model("ProductPrice", ProductPriceSchema);
