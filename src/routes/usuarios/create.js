const express = require('express');

const app = express.Router();

const Usuario = require('../../models/Usuario');

const handler = async (req, res) => {

	const { email } = req.body;

	const usuario = new Usuario(req.body);

	try {
		const buscarEmail = await Usuario.getOne({ email });

		if(buscarEmail)
			return res.status(400).json('el emaiil ya existe ingrese otro');

		const crearUsuario = await usuario.insert();

		console.log(crearUsuario);
		res.status(201).json({ message: crearUsuario });

	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}

};

app.post('/', handler);

module.exports = { app, handler };
