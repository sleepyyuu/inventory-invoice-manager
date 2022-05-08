const express = require("express");
const router = express.Router();

const buyerController = require("../controllers/buyerController");

router.post("/create", buyerController.buyer_create_post);

router.delete("/:buyerId/delete", buyerController.buyer_delete_del);

router.post("/:buyerId/update", buyerController.buyer_update_post);

router.get("/:buyerId", buyerController.buyer_detail);

router.get("/", buyerController.buyer_list);

module.exports = router;
