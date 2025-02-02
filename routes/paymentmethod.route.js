const express = require("express");
const router = express.Router();
const PaymentMethodController = require("../controllers/paymentmethod.controller");

router.get("/", PaymentMethodController.show);
router.post("/", PaymentMethodController.create);
router.delete("/:id", PaymentMethodController.delete);

module.exports = router;
