const express = require("express");
const router = express.Router();

const invoiceController = require("../controllers/invoiceController");

router.post("/", invoiceController.invoice_create_post);

router.delete("/:invoiceId", invoiceController.invoice_delete_del);

router.post("/:invoiceId", invoiceController.invoice_update_post);

router.get("/:invoiceId", invoiceController.invoice_detail);

router.get("/", invoiceController.invoice_list);

module.exports = router;
