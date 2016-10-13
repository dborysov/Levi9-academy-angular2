const mongoose = require('mongoose');
const serverConfig = require('../server.config');
const Product = require('../models/product.model');

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
    return Product.find();
}

function getProductById(id) {
    return Product.findById(id);
}

function createNewProduct(newProduct) {
    const product = new Product(newProduct);

    return product.save();
}

function deleteExistingProduct(id) {
    return Product.findById(id).remove();
}

function updateExistingProduct(newProduct) {
    return Product.findOne({ _id: newProduct._id }, (err, existingProduct) => {
        if (err) {
            console.log(`Cannot update product ${err}`);
            return;
        }
        existingProduct = Object.assign(existingProduct, newProduct);

        existingProduct.save();
    });
}