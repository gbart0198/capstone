const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('product', ProductSchema);