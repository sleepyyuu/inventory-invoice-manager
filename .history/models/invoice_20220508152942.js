const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  invoice_number: { type: Number, required: true },
  date_created: { type: Date, default: Date.now },
  buyer: { type: Schema.Types.ObjectId, ref: "Buyer", required: true },
  product_prices: [{ type: Schema.Types.ObjectId, ref: "ProductPrice" }],
  //hardcode values to save record even if product/buyer deleted
  buyer_name: { type: String, required: true },
  product_info: [{ type: Object }],
  details: { type: String },
});

InvoiceSchema.virtual("padded_invoice_number").get(function () {
  let invoiceString = "" + this.invoice_number;
  return invoiceString.padStart(5, "0");
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
