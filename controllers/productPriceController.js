const ProductPrice = require("../models/productPrice");
const Product = require("../models/product");
const Buyer = require("../models/buyer");

const { body, validationResult } = require("express-validator");

//display all productprice
exports.product_price_list = function (req, res, next) {
  ProductPrice.find()
    .populate("product", "name")
    .populate("buyer", "company_name")
    .exec(function (err, list_product_price) {
      if (err) {
        return next(err);
      }
      //success
      return res.send(list_product_price);
    });
};

//display detail page for a product
exports.product_price_detail = function (req, res, next) {
  ProductPrice.findById(req.params.productPriceId).exec(function (err, productPrice) {
    if (err) {
      if (productPrice == null) {
        const err = new Error("Product price not found");
        err.status = 404;
        return next(err);
      }
      return next(err);
    }
    return res.send(productPrice);
  });
};

//display product creation form, GET, (not needed since using react as frontend)

//handle product creation, POST
exports.product_price_create_post = [
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price is required")
    .escape()
    .isNumeric()
    .withMessage("Must be a number"),
  (req, res, next) => {
    //extract validation errors
    const errors = validationResult(req);
    let productPrice = new ProductPrice({
      product: req.body.product,
      buyer: req.body.buyer,
      price: req.body.price,
      detail: req.body.detail ? req.body.detail : "",
    });
    if (!errors.isEmpty()) {
      return res.send({ productPrice: req.body, errors: errors.array() });
    } else {
      productPrice.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        res.send(productPrice);
      });
    }
  },
];

//display product delete form, GET (do you need this?)

//handle product delete, DEL
exports.product_price_delete_del = function (req, res, next) {
  ProductPrice.findByIdAndRemove(req.params.productPriceId, (err, deleted) => {
    if (err) {
      if (deleted == null) {
        return res.status(404).send("Product price not found");
      }
      return next(err);
    }
    res.sendStatus(204);
  });
};

//display product update form, GET (do you need this?)

//handle product update, POST
exports.product_price_update_post = [
  (req, res, next) => {
    ProductPrice.findOne({ _id: req.params.productId }, function (err, foundProduct) {
      if (err) {
        if (foundProduct == null) {
          return res.status(404).send("Product price not found");
        }
        return next(err);
      }
      foundProduct.product = req.body.product ? req.body.product : foundProduct.product;
      foundProduct.buyer = req.body.buyer ? req.body.buyer : foundProduct.buyer;
      foundProduct.price = req.body.price ? req.body.price : foundProduct.price;
      foundProduct.detail = req.body.detail ? req.body.detail : foundProduct.detail;
      foundProduct.save(function (err) {
        if (err) {
          next(err);
        }
        res.send(foundProduct);
      });
    });
  },
];
