const Product = require('../models/product.db.model');
const ProductDto = require('../models/productDto.model');

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    deleteExistingProduct,
    updateExistingProduct
};

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
    newProduct._id = +new Date();
    newProduct.date = +new Date();

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