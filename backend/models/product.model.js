const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: { type: Number },
    category: { type: String },
    title: { type: String },
    brand: { type: String },
    price: { type: Number },
    image: { type: String },
    description: { type: String },
    details: { type: Array },
    date: { type: Number }
});

module.exports = mongoose.model('Product', ProductSchema);