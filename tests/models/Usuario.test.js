const sinon = require('sinon');
const assert = require('assert');

const UsuarioModel = require('../../src/models/Usuario');

const compareData = (model, data) => {

	const callback = sinon.stub();
	callback.withArgs(sinon.match.string).returns(true);
	assert.deepStrictEqual(model.email, data.email);
	assert.deepStrictEqual(model.isAdmin, data.isAdmin);

	callback(model.contraseña);

};

describe('Test Usuario Model', () => {

	const data = {
		email: 'emmaperez2197@gmail.com',
		contraseña: 'ricoom',
		isAdmin: false
	};

	it('create Example Model', async () => {
		const usuarioModel = new UsuarioModel(data);
		compareData(usuarioModel, data);
	});

	it('should return "usuario" when the static collection function is executed', () => {

		const { collection } = UsuarioModel;
		assert.deepStrictEqual(collection, 'usuarios');
	});

	it('Should return "usuario" when execute the collection instantiated function', () => {

		const collectionUsuario = new UsuarioModel(data);
		assert.deepStrictEqual(collectionUsuario.collection, 'usuarios');
	});

});
