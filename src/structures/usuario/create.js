const Joi = require('joi');

const validateSchema = require('../validateSchema');

module.exports = body => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		contraseña: Joi.string().min(6).required(),
		isAdmin: Joi.boolean()
	});

	return validateSchema(schema, body);
};
