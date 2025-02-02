const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");

router.get("/", CategoryController.show);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.change);
router.delete("/:id", CategoryController.delete);

module.exports = router;
