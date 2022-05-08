const Buyer = require("../models/buyer");
const Invoice = require("../models/invoice");
const ProductPrice = require("../models/productPrice");
const { body, validationResult } = require("express-validator");
const async = require("async");

//display all products
exports.buyer_list = function (req, res, next) {
  Buyer.find()
    .sort([["company_name", "ascending"]])
    .exec(function (err, list_buyer) {
      if (err) {
        return next(err);
      }
      //success
      return res.send(list_buyer);
    });
};

//display detail page for a product
exports.buyer_detail = function (req, res, next) {
  Buyer.findById(req.params.buyerId).exec(function (err, buyer) {
    if (err) {
      if (buyer == null) {
        const err = new Error("Buyer not found");
        err.status = 404;
        return next(err);
      }
      return next(err);
    }
    return res.send(buyer);
  });
};

//display product creation form, GET, (not needed since using react as frontend)

//handle product creation, POST
exports.buyer_create_post = [
  body("company_name").trim().isLength({ min: 1 }).withMessage("Company name is required").escape(),
  body("address").trim().isLength({ min: 1 }).withMessage("Address is required").escape(),
  (req, res, next) => {
    //extract validation errors
    const errors = validationResult(req);
    let buyer = new Buyer({
      company_name: req.body.company_name,
      address: req.body.address,
      phone_number: req.body.phone_number ? req.body.phone_number : "",
    });
    if (!errors.isEmpty()) {
      return res.send({ buyer: req.body, errors: errors.array() });
    } else {
      buyer.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        res.send(buyer);
      });
    }
  },
];

//display product delete form, GET (do you need this?)

//handle product delete, DEL
exports.buyer_delete_del = function (req, res, next) {
  async.parallel(
    {
      buyer: function (callback) {
        Buyer.findByIdAndRemove(req.params.buyerId, callback);
      },
      productPrice: function (callback) {
        ProductPrice.deleteMany({ buyer: req.params.buyerId }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        if (results.buyer == null) {
          const err = new Error("Buyer not found");
          err.status = 404;
          return next(err);
        }
        next(err);
      } else {
        res.sendStatus(204);
      }
    }
  );
};

//display product update form, GET (do you need this?)

//handle product update, POST
exports.buyer_update_post = [
  (req, res, next) => {
    Buyer.findOne({ _id: req.params.buyerId }, function (err, foundBuyer) {
      if (err) {
        if (foundBuyer == null) {
          const err = new Error("Buyer not found");
          err.status = 404;
          return next(err);
        }
        return next(err);
      }
      foundBuyer.company_name = req.body.company_name ? req.body.company_name : foundBuyer.company_name;
      foundBuyer.address = req.body.address ? req.body.address : foundBuyer.address;
      foundBuyer.phone_number = req.body.phone_number ? req.body.phone_number : foundBuyer.phone_number;
      foundBuyer.save(function (err) {
        if (err) {
          next(err);
        }
        res.send(foundBuyer);
      });
    });
  },
];
