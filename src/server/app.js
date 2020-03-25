const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
//Express Instance
const app = express();
// Accept json form request.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// set default folder
app.use(express.static(path.resolve(__dirname, 'dist')));
// Router
app.use('/', require('./route/router'));

module.exports = app;
