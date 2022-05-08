const Product = require("../models/product");
const ProductPrice = require("../models/productPrice");
const { body, validationResult } = require("express-validator");

//display all products
exports.product_list = function (req, res, next) {
  Product.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_product) {
      if (err) {
        return next(err);
      }
      //success
      return res.send(list_product);
    });
};

//display detail page for a product
exports.product_detail = function (req, res, next) {
  Product.findById(req.params.productId).exec(function (err, product) {
    if (err) {
      if (product == null) {
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
      }
      return next(err);
    }

    return res.send(product);
  });
};

//display product creation form, GET, (not needed since using react as frontend)

//handle product creation, POST
exports.product_create_post = [
  body("name").trim().isLength({ min: 1 }).withMessage("Product name is required").escape(),
  (req, res, next) => {
    //extract validation errors
    const errors = validationResult(req);
    let product = new Product({
      name: req.body.name,
      price_range: req.body.price_range ? req.body.price_range : "" + req.body.price,
    });
    if (!errors.isEmpty()) {
      return res.send({ product: req.body, errors: errors.array() });
    } else {
      product.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        res.send(product);
      });
    }
  },
];

//display product delete form, GET (do you need this?)

//handle product delete, DEL
exports.product_delete_del = function (req, res, next) {
  ProductPrice.find({ product: req.params.productId }).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.productPrice > 0) {
      const err = new Error("This product is still used in prices, delete all associated prices first.");
      err.status = 405;
      return next(err);
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
exports.product_update_post = [
  (req, res, next) => {
    Product.findOne({ _id: req.params.productId }, function (err, foundProduct) {
      if (err) {
        if (foundProduct == null) {
          const err = new Error("Product not found");
          err.status = 404;
          return next(err);
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
