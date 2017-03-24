import express from 'express';
let app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
global.config = require('./config/config');

//import jwt from 'jsonwebtoken';
//import User from './models/user';

import { router } from "./routes";

mongoose.connect("mongodb://localhost/demo");

app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());

//app.use(require('./controllers'));
app.use("/", router);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(3000, () => {
    console.log('App running on 3000');
});