import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from 'mongoose';
global.config = require('./config/config');

import { router } from "./routes";
import winston from 'winston';

winston.info("Starting application");

let app = express();

winston.info("Initializing express");

mongoose.set('debug', true);

mongoose.connect("mongodb://" + global.config.MONGODB_HOST + "/" + global.config.MONGODB_COLLECTION_NAME);

mongoose.connection.on('error', function () {
    winston.info('Mongoose connection error');
});

app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

winston.info("server.js listen: Going to start app on the provided port. ");
winston.info("Creating HTTP server on port: %s", global.config.PORT);

app.listen(global.config.PORT, () => {
    winston.info("HTTP Server listening on port: %s", global.config.PORT);
});