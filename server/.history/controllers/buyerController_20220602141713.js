const Buyer = require("../models/buyer");
const Invoice = require("../models/invoice");
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
        return res.status(404).send("Buyer not found");
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
  (req, res, next) => {
    //extract validation errors
    const errors = validationResult(req);
    let buyer = new Buyer({
      company_name: req.body.company_name,
      address: req.body.address ? req.body.address : "",
      city: req.body.city ? req.body.city : "",
      state: req.body.state ? req.body.state : "",
      zip: req.body.zip ? req.body.zip : 00000,
      phone_number: req.body.phone_number ? req.body.phone_number : "",
    });
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      buyer.save(function (err) {
        if (err) {
          console.log(err);
          return next(err);
        }
        //success
        res.status(200).send("Success");
      });
    }
  },
];

//handle product delete, DEL
exports.buyer_delete_del = async function (req, res, next) {
  const buyer = await Buyer.findOne({ _id: req.params.buyerId }).exec();
  if (buyer === null) {
    return res.status(404).send("Buyer not found");
  }

  Buyer.findByIdAndDelete(req.params.buyerId, (err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send("Success");
  });
};

//display product update form, GET (do you need this?)

//handle product update, POST
exports.buyer_update_post = [
  (req, res, next) => {
    Buyer.findOne({ _id: req.params.buyerId }, function (err, foundBuyer) {
      if (err) {
        if (foundBuyer == null) {
          return res.status(404).send("Buyer not found");
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
        res.status(200).send("Success");
      });
    });
  },
];
