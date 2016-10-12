const express = require('express');
const db = require('../db-utils');

module.exports = app => {

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
            .then(products => {
                response.json({
                    success: true,
                    message: "The data was successfully retrieved!",
                    data: products
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: `Couldn't fetch data:  ${error}`,
                    data: []
                });
            });
    });

    //Creating new product
    apiRouter.post('/products', (request, response) => {

        const newProduct = request.body;

        if (newProduct) {

            db.createNewProduct(newProduct);

            response.json({
                success: true,
                message: "New product was successfully created!",
                data: []
            });
        } else {
            response.json({
                success: false,
                message: "Couldn't create a product!",
                data: []
            });
        }
    });

    //Getting single product by id
    apiRouter.get('/products/:id', (request, response) => {

        const id = request.params.id;

        db.getProductById(id)
            .then(product => {
                response.json({
                    success: true,
                    message: "The data was successfully retrieved",
                    data: [product]
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: `The data wasn't found! ${error}`,
                    data: []
                });
            });
    });

    //Updating existing product
    apiRouter.put('/products/:id', (request, response) => {

        const id = request.params.id;
        const productToUpdate = request.body;

        db.updateExistingProduct(productToUpdate)
            .then(data => {
                response.json({
                    success: true,
                    message: "Successfully updated!",
                    data: []
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: `Cannot update the product ${error}`,
                    data: []
                });
            });
    });

    //Deleting existing product
    apiRouter.delete('/products/:id', (request, response) => {

        const id = request.params.id;

        db.deleteExistingProduct(id)
            .then(data => {
                response.json({
                    success: true,
                    message: "Successfully deleted!",
                    data: []
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: `Cannot delete the product! ${error}`,
                    data: []
                });
            });
    });

    return apiRouter;
};