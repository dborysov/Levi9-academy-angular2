const app = require('express')();
const bodyParser = require('body-parser');
const serverConfig = require('./server.config');
const apiRouter = require('./routes/api-router')

//Using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
});

// API Routes
const apiRoutes = apiRouter(app);
app.use('/api', apiRoutes);

//Listening to client requests
app.get('*', (request, response) => {
    response.end("API Server -> use `/api` resource");
});

app.listen(serverConfig.port, error => {
    if (error) {
        console.error(error);
    } else {
        console.info(`The server is running on port: ${serverConfig.port}`);
    }
});