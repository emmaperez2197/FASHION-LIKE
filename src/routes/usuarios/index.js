const nameModule = 'usuarios/';

const { app: create } = require('../usuarios/create');


module.exports = define => {
	define(nameModule + 'create', create);

};
