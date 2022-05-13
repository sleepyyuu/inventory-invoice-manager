const express = require("express");
const router = express.Router();

const productPriceController = require("../controllers/productPriceController");

router.post("/", productPriceController.product_price_create_post);

router.delete("/:productPriceId", productPriceController.product_price_delete_del);

router.post("/:productPriceId", productPriceController.product_price_update_post);

router.get("/:productPriceId", productPriceController.product_price_detail);

router.get("/", productPriceController.product_price_list);

module.exports = router;
