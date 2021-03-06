const express = require('express');
const productDb = require('../DAO/product');
const userDb = require('../DAO/user');
const dbHelper = require('../dbHelper');
const Product = require('../models/product.view.model');
const HttpStatus = require('http-status-codes');
const jwt = require('express-jwt');
const config = require('../server.config');

module.exports = () => {

    //Api router
    const apiRouter = express.Router();

    //Connecting to the database
    dbHelper.setUpConnection();

    //Middleware for Logging each request to the console
    apiRouter.use((request, response, next) => {
        console.log(request.method, `/api${request.url}`);
        next();
    });

    //Getting all products
    apiRouter.get('/products', (request, response) => {
        if (request.query.ids === undefined) {
            return productDb.getAllProducts()
                .then(products => response.json(products.map(product => Product.fromDto(product))))
                .catch(error => response.status(HttpStatus.NOT_FOUND).json(`Couldn't fetch data:  ${error || ''}`));
        }
        const ids = request.query.ids;

        if (Array.isArray(ids)) {
            return productDb.getProductsByIds(ids)
                .then(products => response.json(products.map(product => Product.fromDto(product))))
                .catch(error => response.status(HttpStatus.NOT_FOUND).json(`Couldn't fetch data:  ${error || ''}`));
        }

        return productDb.getProductById(ids)
            .then(product => response.json([new Product(product)]))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`The data wasn't found! ${error || ''}`));
    });

    //Creating new product
    apiRouter.post('/products', jwt({ secret: config.jwtToken }), (request, response) => {
        const newProduct = new Product(request.body).toDto();

        productDb.createNewProduct(newProduct)
            .then(createdProduct => response.status(HttpStatus.CREATED).json(Product.fromDto((createdProduct))))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`Couldn't create product: ${error || ''}`));
    });

    //Updating existing product
    apiRouter.put('/products/:id', jwt({ secret: config.jwtToken }), (request, response) => {
        const productToUpdate = new Product(request.body);
        const id = JSON.parse(request.params.id);

        productToUpdate.id = null;

        productDb.updateExistingProduct(id, productToUpdate)
            .then(product => response.json(Product.fromDto(product)))
            .catch(error => `Cannot update the product ${error || ''}`);
    });

    //Deleting existing product
    apiRouter.delete('/products/:id', jwt({ secret: config.jwtToken }), (request, response) => {
        const id = request.params.id;

        productDb.deleteExistingProduct(id)
            .then(() => response.sendStatus(HttpStatus.NO_CONTENT))
            .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`Cannot delete the product! ${error || ''}`));
    });

    apiRouter.post('/users/register', (request, response) => {
        userDb.register(request.body.email, request.body.password)
            .then(token => response.status(HttpStatus.CREATED).json(token))
            .catch(err => response.status(HttpStatus.BAD_REQUEST).json(err));
    })

    apiRouter.post('/users/login', (request, response) => {
        userDb.login(request.body.email, request.body.password)
            .then(token => response.status(HttpStatus.OK).json(token))
            .catch(err => response.status(HttpStatus.UNAUTHORIZED).json(err.message));
    })

    return apiRouter;
};