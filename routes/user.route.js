const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.post("/auth", UserController.authorize);
router.patch("/auth", UserController.editprofile);
module.exports = router;
