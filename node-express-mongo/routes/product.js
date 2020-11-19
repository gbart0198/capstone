const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadImage = require("../middlewares/multer");
const userPassportJWT = require("../middlewares/userPassportJWT")();
const adminPassportJWT = require("../middlewares/adminPassportJWT")();

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post(
    "/",
    adminPassportJWT.authenticate(),
    uploadImage("products").single("image"),
    productController.store);
router.patch("/:id",
    adminPassportJWT.authenticate(),
    uploadImage("products").single("image"),
    productController.update);
router.delete(
    "/:id",
    adminPassportJWT.authenticate(),
    productController.delete);


module.exports = router;