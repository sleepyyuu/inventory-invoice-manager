const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  //invoice number can be based on num of collections in invoice document
  invoice_number: { type: Number, required: true },
  date_created: { type: Date, default: Date.now },
  buyer: { type: Schema.Types.ObjectId, ref: "Buyer", required: true },
  product_prices: [{ type: Schema.Types.ObjectId, ref: "ProductPrice" }],
  details: { type: String },
});

InvoiceSchema.virtual("padded_invoice_number").get(function () {
  let invoiceString = "" + this.invoice_number;
  return invoiceString.padStart(5, "0");
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
