const express = require('express');
const productDb = require('../DAO/product');
const Product = require('../models/product.view.model');
const HttpStatus = require('http-status-codes');

module.exports = () => {

    //Api router
    const apiRouter = express.Router();

    //Connecting to the database
    productDb.setUpConnection();

    //Middleware for Logging each request to the console
    apiRouter.use((request, response, next) => {
        console.log(request.method, `/api${request.url}`);
        next();
    });

    //Getting all products
    apiRouter.get('/products', (request, response) => {
        productDb.getAllProducts()
            .then(products => response.json(products.map(product => Product.fromDto(product))))
            .catch(error => response.status(HttpStatus.NOT_FOUND).json(`Couldn't fetch data:  ${error || ''}`));
    });

    //Creating new product
    apiRouter.post('/products', (request, response) => {
        const newProduct = new Product(request.body).toDto();

        productDb.createNewProduct(newProduct)
            .then(createdProduct => response.status(HttpStatus.CREATED).json(Product.fromDto((createdProduct))))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`Couldn't create product: ${error || ''}`));
    });

    //Getting single product by id
    apiRouter.get('/products/:id', (request, response) => {
        const id = request.params.id;

        productDb.getProductById(id)
            .then(product => response.json(new Product(product)))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`The data wasn't found! ${error || ''}`));
    });

    //Updating existing product
    apiRouter.put('/products/:id', (request, response) => {
        const productToUpdate = new Product(request.body);
        const id = request.params.id;

        productToUpdate.id = null;

        productDb.updateExistingProduct(id, productToUpdate)
            .then(product => response.json(Product.fromDto(product)))
            .catch(error => `Cannot update the product ${error || ''}`);
    });

    //Deleting existing product
    apiRouter.delete('/products/:id', (request, response) => {
        const id = request.params.id;

        productDb.deleteExistingProduct(id)
            .then(() => response.sendStatus(HttpStatus.NO_CONTENT))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`Cannot delete the product! ${error || ''}`));
    });

    return apiRouter;
};