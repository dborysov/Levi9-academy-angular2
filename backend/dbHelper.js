const mongoose = require('mongoose');
const serverConfig = require('./server.config');

module.exports = class Helper {
    static setUpConnection() {
        const db = mongoose.connection;
        const dbUri = `mongodb://${serverConfig.db.host}:${serverConfig.db.port}/${serverConfig.db.name}`;

        db
            .on('connecting', () => { console.log('connecting to MongoDB...'); })
            .on('error', error => {
                console.error(`Error in MongoDb connection: ${error}`);
                mongoose.disconnect();
            })
            .on('connected', () => { console.log('MongoDB connected!'); })
            .once('open', () => { console.log('MongoDB connection opened!'); })
            .on('reconnected', () => { console.log('MongoDB reconnected!'); })
            .on('disconnected', () => {
                console.log('MongoDB disconnected!');
                mongoose.connect(dbUri, { server: { auto_reconnect: true } });
            });

        mongoose.connect(dbUri, { server: { auto_reconnect: true } });
    }
};
