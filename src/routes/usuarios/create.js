const express = require('express');

const app = express.Router();

const handler = (req, res) => {

	console.log('hola');

};

app.use('/', handler);

module.exports = { app, handler };
