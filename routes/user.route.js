const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.post("/authorize", UserController.authorize);
router.patch("/authorize", UserController.editProfile);
module.exports = router;
