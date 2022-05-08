const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  invoice_number: { type: Number },
  date_created: { type: Date },
  buyer: { type: Schema.Types.ObjectId, ref: "Buyer", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  details: { type: String },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
