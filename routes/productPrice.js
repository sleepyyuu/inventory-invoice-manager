const express = require("express");
const router = express.Router();

const productPriceController = require("../controllers/productPriceController");

router.post("/create", productPriceController.product_price_create_post);

router.delete("/:productPriceId/delete", productPriceController.product_price_delete_del);

router.post("/:productPriceId/update", productPriceController.product_price_update_post);

router.get("/:productPriceId", productPriceController.product_price_detail);

router.get("/", productPriceController.product_price_list);

module.exports = router;
