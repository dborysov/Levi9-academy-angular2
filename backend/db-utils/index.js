const mongoose = require('mongoose');
const serverConfig = require('../server.config');
const Product = require('../models/productDTO.model');

module.exports = {
    setUpConnection,
    getAllProducts,
    getProductById,
    createNewProduct,
    deleteExistingProduct,
    updateExistingProduct
};

function setUpConnection() {
    mongoose.connect(`mongodb://${serverConfig.db.host}:${serverConfig.db.port}/${serverConfig.db.name}`);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.log.bind(console, 'Successfully connected to the database'));
}

function getAllProducts() {
    return Promise.resolve(Product.find());
}

function getProductById(id) {
    return Promise.resolve(Product.findById(id));
}

function createNewProduct(newProduct) {
    const product = new Product(newProduct);

    return Promise.resolve(product.save());
}

function deleteExistingProduct(id) {
    return Promise.resolve(Product.findById(id).remove());
}

function updateExistingProduct(newProduct) {
    return Promise.resolve(Product.findOne({ _id: newProduct._id }))
        .then(res => Object.assign(res, newProduct).save())
        .catch(console.log.bind(console, 'Cannot update product'));
}