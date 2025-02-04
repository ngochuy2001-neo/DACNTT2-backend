const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/address.controller");

router.get("/", AddressController.getUserAddresses);
router.post("/", AddressController.createAddress);
router.put("/", AddressController.updateAddress);
router.delete("/", AddressController.deleteAddress)

module.exports = router;
