let app = null;
const usuarios = require('./usuarios');


const defineRoute = (ruta, requests) => {
	const baseRequest = '/api/';
	const route = baseRequest + ruta;

	app.use(route, requests);
};

module.exports = aplication => {
	app = aplication;


	usuarios(defineRoute);


};
