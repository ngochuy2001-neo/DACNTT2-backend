const express = require("express");
const router = express.Router();
const BrandController = require("../controllers/brand.controller");

router.get("/", BrandController.show);
router.post("/", BrandController.create);

module.exports = router;
