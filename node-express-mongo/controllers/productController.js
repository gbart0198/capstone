const { findById } = require("../models/product");
const fs = require('fs');
const path = require('path');
const Product = require("../models/product");
const { post } = require("../routes/product");
const validationHandler = require("../validations/validationHandler");

exports.index = async (req, res, next) => {
    //res.send({ message: "get all products" });
    try {
        const products = await Product.find().sort({ createdAt: -1});
        res.send(products);
    } catch(err) {
        next(err);
    }
}

exports.show = async (req, res, next) => {
    //res.send({ message: "get product"});
    try {
        const product = await Product.findOne({
            _id: req.params.id
        });

        res.send(product);
    } catch(err) {
        next(err);
    }
}

exports.store = async (req, res, next) => {
    try {
        validationHandler(req);

        let product = new Product();
        if (!product) {
            const error = new Error("Not authorized user to add new product");
            error.statusCode = 400;
            throw error;
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.brand = req.body.brand;
        product.price = req.body.price;
        product.image = req.file.filename;
        product = await product.save();
        res.send(product);

    } catch(err) {
        next(err);
    }
}

exports.update = async (req, res, next) => {
    try {
        validationHandler(req);

        let product = await Product.findById(req.params.id);
        if (req.body.brand) {
            product.brand = req.body.brand;
        }
        if (req.body.description) {
            product.description = req.body.description;
        }
        if (req.body.price) {
            product.price = req.body.price;
        }

        if (req.body.name) {
            product.name = req.body.name;
        }

        if (req.file) {
            product.image = req.file.filename;
        } 
        

        product = await product.save();
        res.send(product);

    } catch(err) {
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            const error = new Error("Unauthorized user. ");
            error.statusCode = 400;
            throw error;
        }
        await product.delete();
        res.send({message: "Product successfully deleted"});
    } catch (err) {
        next(err);
    }
}