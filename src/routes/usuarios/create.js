const express = require('express');

const app = express.Router();

const Usuario = require('../../models/Usuario');

const schemaCreate = require('../../structures/usuario/create');

const handler = async (req, res) => {

	const { email } = req.body;

	const validacionDelBody = await schemaCreate(req.body);

	if(validacionDelBody.error)
		return res.status(400).json(validacionDelBody);

	const usuario = new Usuario(req.body);

	try {
		const buscarEmail = await Usuario.getOne({ email });

		if(buscarEmail)
			return res.status(200).json({ message: `el email: ${email} ya esta registrado, por favor ingrese otro` });

		const crearUsuario = await usuario.insert();

		res.status(201).json({ message: crearUsuario.insertedId, code: 2 });

	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}

};

app.post('/', handler);

module.exports = { app, handler };
