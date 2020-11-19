const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminPassportJWT = require("../middlewares/adminPassportJWT")();

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.patch("/:id",
    adminPassportJWT.authenticate(),
    userController.update);
router.delete("/:id",
    adminPassportJWT.authenticate(),
    userController.delete);


module.exports = router;

