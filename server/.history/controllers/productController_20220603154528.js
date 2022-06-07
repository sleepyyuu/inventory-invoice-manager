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
  Product.findById(req.body.productId).exec(function (err, product) {
    if (err) {
      if (product == null) {
        return res.status(404).send("Product not found");
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
      price: req.body.price ? req.body.price : 0,
      quantity: req.body.quantity ? req.body.quantity : 0,
    });
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      product.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        res.status(200).send("Success");
      });
    }
  },
];

//display product delete form, GET (do you need this?)

//handle product delete, DEL
exports.product_delete_del = async function (req, res, next) {
  const product = await Product.findOne({ _id: req.params.productId }).exec();
  if (product === null) {
    return res.status(404).send("Product not found");
  }

  ProductPrice.find({ product: req.params.productId }).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.length > 0) {
      return res.status(400).send("This product is still used in prices, delete all associated prices first.");
    } else {
      Product.findByIdAndDelete(req.params.productId, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).send("Success");
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
          return res.status(404).send("Product not found");
        }
        return next(err);
      }
      console.log(req.body.quantity);

      foundProduct.name = req.body.name ? req.body.name : foundProduct.name;
      foundProduct.price = req.body.price ? req.body.price : foundProduct.price;
      foundProduct.quantity = req.body.quantity == 0 || req.body.quantity ? req.body.quantity : foundProduct.quantity;
      foundProduct.save(function (err) {
        if (err) {
          next(err);
        }
        res.status(200).send("Success");
      });
    });
  },
];
