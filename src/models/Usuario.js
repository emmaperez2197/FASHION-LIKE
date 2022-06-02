const bcrypt = require('bcrypt');

const Model = require('../../modules/class/Model');

const saltRounds = 10;

class Usuario extends Model {
	constructor({ email, contraseña, isAdmin }) {
		super();
		this.email = email;
		this.contraseña = bcrypt.hashSync(contraseña, saltRounds);
		this.isAdmin = isAdmin;
	}

	static get collection() {
		return 'usuarios';
	}

	get collection() {
		return 'usuarios';
	}

}

module.exports = Usuario;
