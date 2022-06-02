const express = require('express');

const app = express.Router();

const handler = (req, res) => {

};

app.use('/', handler);

module.exports = { app, handler };
