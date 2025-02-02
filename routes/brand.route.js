const express = require("express");
const router = express.Router();
const BrandController = require("../controllers/brand.controller");

router.get("/", BrandController.show);
router.post("/", BrandController.create);
router.put("/:id", BrandController.change);
router.delete("/:id", BrandController.delete);

module.exports = router;
