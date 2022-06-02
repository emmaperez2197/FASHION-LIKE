const express = require('express');

const app = express.Router();



const handler = (req, res) => {

    console.log('hola');

}


app.post('/', handler);

module.exports = { app, handler };