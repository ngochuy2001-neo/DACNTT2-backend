const express = require("express");
const router = express.Router();
const laptopController = require("../controllers/laptop.controller");
const upload = require("../configs/multer");

router.get("/", laptopController.getAll);
router.get("/:id", laptopController.getById);
router.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "variantImages", maxCount: 10 },
  ]),
  laptopController.create
);
router.delete("/:id", laptopController.delete);
router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "variantImages", maxCount: 10 },
  ]),
  laptopController.update
);

module.exports = router;
