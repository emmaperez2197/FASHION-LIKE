require('dotenv').config()

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const routes = require('./src/routes/index');

const app = express();

app.use(morgan('dev'));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/* eslint-disable */
app.listen(process.env.PORT, () => {
	console.log('running in the port:', process.env.PORT);
});


// routes(app);

module.exports = app