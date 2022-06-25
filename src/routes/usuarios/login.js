const express = require('express');

const app = express.Router();
const bcrypt = require('bcrypt');

const Usuario = require('../../models/Usuario');
const schemaBody = require('../../structures/usuario/login');

const handler = async (req, res) => {

	try {

		const validarBody = await schemaBody(req.body);

		if(validarBody.error)
			return res.status(400).json(validarBody);

		const { email, contraseña } = req.body;
		const traerUnUsuario = await Usuario.getOne({ email }, { contraseña: 1 });

		const anhash = bcrypt.compareSync(contraseña, traerUnUsuario.contraseña);
		if(!anhash)
			return 	res.status(400).json({ message: 'los datos ingresados son incorrectos, intente nuevamente' });

		res.status(200).json({ messaje: `Bienvenido/a ${traerUnUsuario.nombre}  ${traerUnUsuario.apellido}` });

	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}

};

app.get('/', handler);

module.exports = { app, handler };
