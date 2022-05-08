const Invoice = require("../models/invoice");
const Buyer = require("../models/buyer");
const Product = require("../models/product");
const ProductPrice = require("../models/productPrice");
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

//display product creation form, GET, (not needed since using react as frontend)

//handle product creation, POST
exports.invoice_create_post = [
  body("details").trim().escape(),
  (req, res, next) => {
    //extract validation errors
    const errors = validationResult(req);
    Invoice.count({}, function (err, count) {
      let invoice = new Invoice({
        invoice_number: count,
        buyer: req.body.buyer,
        //product prices should be an array of productprice objects
        product_prices: JSON.parse(req.body.product_prices),
        details: req.body.details,
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
    });
  },
];

//display product delete form, GET (do you need this?)

//handle product delete, DEL
exports.invoice_delete_del = function (req, res, next) {
  Product.findOne({ _id: req.params.productId }).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    if (results == null) {
      return res.status(404).send("Product not found");
    }
  });
  ProductPrice.find({ product: req.params.productId }).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.length > 0) {
      return res.status(405).send("This product is still used in prices, delete all associated prices first.");
    } else {
      Product.findByIdAndDelete(req.params.productId, (err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(204);
      });
    }
  });
};

//display product update form, GET (do you need this?)

//handle product update, POST
exports.invoice_update_post = [
  (req, res, next) => {
    Product.findOne({ _id: req.params.productId }, function (err, foundProduct) {
      if (err) {
        if (foundProduct == null) {
          return res.status(404).send("Product not found");
        }
        return next(err);
      }
      foundProduct.name = req.body.name ? req.body.name : foundProduct.name;
      foundProduct.price_range = req.body.price_range ? req.body.price_range : foundProduct.price_range;
      foundProduct.save(function (err) {
        if (err) {
          next(err);
        }
        res.send(foundProduct);
      });
    });
  },
];
