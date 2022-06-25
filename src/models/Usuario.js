const bcrypt = require('bcrypt');

const Model = require('../../modules/class/Model');

const saltRounds = 10;

class Usuario extends Model {
	constructor({
		nombre, apellido, email, contraseña, isAdmin
	}) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
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
