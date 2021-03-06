const Invoice = require("../models/invoice");
const Counter = require("../models/counter");
const { body, validationResult } = require("express-validator");

//display all invoices
exports.invoice_list = function (req, res, next) {
  Invoice.find()
    .sort([["invoice_number", "descending"]])
    .exec(function (err, list_invoice) {
      if (err) {
        return next(err);
      }
      //success
      return res.send(list_invoice);
    });
};

//display detail page for a invoice
exports.invoice_detail = function (req, res, next) {
  Invoice.findById(req.params.invoiceId).exec(function (err, invoice) {
    if (err) {
      if (invoice == null) {
        return res.status(404).send("Invoice not found");
      }
      return next(err);
    }
    return res.send(invoice);
  });
};

//handle product creation, POST
exports.invoice_create_post = [
  body("details").trim().escape(),
  async (req, res, next) => {
    //extract validation errors
    let counter = await Counter.findOne({ name: "invoice" });
    let count;
    if (counter === null) {
      counter = new Counter({
        name: "invoice",
        counter: 0,
      });
      count = 0;
      await counter.save();
    } else {
      counter.counter++;
      await counter.save();
      count = counter.counter;
    }
    const errors = validationResult(req);
    let invoice = new Invoice({
      invoice_number: count,
      //buyer is buyer id
      buyer: req.body.buyer,
      buyer_name: req.body.buyer_name,
      //product prices should be an array of productprice objects id
      product: req.body.product,
      details: req.body.details,
      total: req.body.total,
      buyer_address: req.body.buyer_address,
      tax_rate: req.body.tax_rate,
      other_discount: req.body.other_discount,
    });
    if (!errors.isEmpty()) {
      return res.send({ invoice: req.body, errors: errors.array() });
    } else {
      invoice.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        res.send(invoice);
      });
    }
  },
];

//display product delete form, GET (do you need this?)

//handle product delete, DEL
exports.invoice_delete_del = function (req, res, next) {
  Invoice.findByIdAndRemove(req.params.invoiceId, (err, deleted) => {
    if (err) {
      if (deleted == null) {
        return res.status(404).send("Invoice not found");
      }
      return next(err);
    }
    res.status(200).send("Success");
  });
};

//display product update form, GET (do you need this?)

//handle product update, POST
exports.invoice_update_post = [
  (req, res, next) => {
    Invoice.findOne({ _id: req.params.invoiceId }, function (err, foundInvoice) {
      if (err) {
        if (foundInvoice == null) {
          return res.status(404).send("Invoice not found");
        }
        return next(err);
      }
      if (req.body.product) {
        foundInvoice.product = req.body.product;
      }
      if (req.body.buyer) {
        foundInvoice.buyer = req.body.buyer;
        foundInvoice.buyer_name = req.body.buyer_name;
      }
      if (req.body.details) {
        foundInvoice.details = req.body.details;
      }
      if (req.body.total) {
        foundInvoice.total = req.body.total;
      }
      if (req.body.buyer_address) {
        foundInvoice.buyer_address = req.body.buyer_address;
      }
      if (req.body.tax_rate) {
        foundInvoice.tax_rate = req.body.tax_rate;
      }
      if (req.body.other_discount) {
        foundInvoice.other_discount = req.body.other_discount;
      }
      foundInvoice.save(function (err) {
        if (err) {
          next(err);
        }
        res.send(foundInvoice);
      });
    });
  },
];
