const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.post("/create", productController.product_create_post);

router.delete("/:productId/delete", productController.product_delete_del);

router.post("/:productId/update", productController.product_update_post);

router.get("/:productId", productController.product_detail);

router.get("/", productController.product_list);

module.exports = router;
