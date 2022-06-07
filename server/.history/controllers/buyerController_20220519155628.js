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
      address: req.body.address ? req.body.address : ""
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
        res.status(200).send("Success");
      });
    }
  },
];

//display product delete form, GET (do you need this?)

//this handles deleting all associated buyer prices, make super confirmation page for this
// exports.buyer_delete_del = function (req, res, next) {
//     async.parallel(
//       {
//         buyer: function (callback) {
//           Buyer.findByIdAndRemove(req.params.buyerId, callback);
//         },
//         productPrice: function (callback) {
//           ProductPrice.deleteMany({ buyer: req.params.buyerId }).exec(callback);
//         },
//       },
//       function (err, results) {
//         if (err) {
//           return next(err);
//         } else {
//           res.sendStatus(204);
//         }
//       }
//     );
//   };
//handle product delete, DEL
exports.buyer_delete_del = async function (req, res, next) {
  const buyer = await Buyer.findOne({ _id: req.params.buyerId }).exec();
  if (buyer === null) {
    return res.status(404).send("Buyer not found");
  }

  Product.findByIdAndDelete(req.params.buyerId, (err) => {
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
