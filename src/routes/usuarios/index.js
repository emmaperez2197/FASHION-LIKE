const nameModule = 'usuarios/';

const { app: create } = require('./create');
const { app: login } = require('./login');

module.exports = define => {
	define(nameModule + 'create', create);
	define(nameModule + 'login', login);

};
