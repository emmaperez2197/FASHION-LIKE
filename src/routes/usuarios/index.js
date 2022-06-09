const nameModule = 'usuarios/';

const { app: create } = require('./registrarUsuario');

module.exports = define => {
	define(nameModule + 'create', create);

};
