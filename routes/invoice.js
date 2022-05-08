const express = require("express");
const router = express.Router();

const invoiceController = require("../controllers/invoiceController");

router.post("/", invoiceController.invoice_create_post);

router.delete("/:buyerId", invoiceController.invoice_delete_del);

router.post("/:buyerId", invoiceController.invoice_update_post);

router.get("/:buyerId", invoiceController.invoice_detail);

router.get("/", invoiceController.invoice_list);

module.exports = router;
