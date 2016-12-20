const mongoose = require('mongoose');
const serverConfig = require('./server.config');

module.exports = class Helper {
    static setUpConnection() {
        mongoose.connect(`mongodb://${serverConfig.db.host}:${serverConfig.db.port}/${serverConfig.db.name}`);

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', console.log.bind(console, 'Successfully connected to the database'));
    }
};
