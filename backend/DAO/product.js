const mongoose = require('mongoose');
const serverConfig = require('../server.config');
const Product = require('../models/product.db.model');
const ProductDto = require('../models/productDto.model');

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
    return Promise.resolve(Product.find())
        .then(response => response.map(doc => new ProductDto(doc)))
        .catch(handleError);
}

function getProductById(id) {
    return Promise.resolve(Product.findById(id))
        .then(response => new ProductDto(response))
        .catch(handleError);
}

function createNewProduct(newProduct) {
    newProduct._id = newProduct.id;
    newProduct.id = null;

    return Promise.resolve(new Product(newProduct).save())
        .catch(handleError);
}

function deleteExistingProduct(id) {
    return Promise.resolve(Product.findById(id).remove())
        .catch(handleError);
}

function updateExistingProduct(id, newProduct) {
    return Promise.resolve(Product.findOne({ _id: id }))
        .then(res => Object.assign(res, newProduct).save())
        .catch(handleError);
}

function handleError(error) { throw error.errmsg; }