const express = require('express');
const db = require('../db-utils');
const Product = require('../models/product.model');
const HttpStatus = require('http-status-codes');

module.exports = () => {

    //Api router
    const apiRouter = express.Router();

    //Connecting to the database
    db.setUpConnection();

    //Middleware for Logging each request to the console
    apiRouter.use((request, response, next) => {
        console.log(request.method, `/api${request.url}`);
        next();
    });

    //Getting all products
    apiRouter.get('/products', (request, response) => {
        db.getAllProducts()
            .then(products => response.json(products.map(product => new Product(product))))
            .catch(error => response.status(HttpStatus.NOT_FOUND).json(`Couldn't fetch data:  ${error.errmsg}`));
    });

    //Creating new product
    apiRouter.post('/products', (request, response) => {
        const newProduct = request.body;

        db.createNewProduct(newProduct)
            .then(createdProduct => response.status(201).json(new Product(createdProduct)))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`Couldn't create product: ${error.errmsg}`));
    });

    //Getting single product by id
    apiRouter.get('/products/:id', (request, response) => {
        const id = request.params.id;

        db.getProductById(id)
            .then(product => response.json(new Product(product)))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`The data wasn't found! ${error.errmsg}`));
    });

    //Updating existing product
    apiRouter.put('/products', (request, response) => {
        const productToUpdate = request.body;

        db.updateExistingProduct(productToUpdate)
            .then(product => response.json(new Product(product)))
            .catch(error => `Cannot update the product ${error.errmsg}`);
    });

    //Deleting existing product
    apiRouter.delete('/products/:id', (request, response) => {
        const id = request.params.id;

        db.deleteExistingProduct(id)
            .then(() => response.sendStatus(HttpStatus.NO_CONTENT))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`Cannot delete the product! ${error.errmsg}`));
    });

    return apiRouter;
};