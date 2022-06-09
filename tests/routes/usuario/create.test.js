const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const { mockResponse, mockRequest } = require('../../mocks');

const { handler } = require('../../../src/routes/usuarios/create');

const UsuarioModel = require('../../../src/models/Usuario');

describe('Create Usuario api test', () => {

	afterEach(() => sandbox.restore());

	const fakeBody = {
		email: 'emmaperez2197@gmail.com',
		contraseña: 'ricoomuerto',
		isAdmin: false
	};
	const fakeId = {
		message: '62a240cc18667ae2776c3db3',
		code: 2
	};

	const usuarioGetted = {

		email: 'emma2197@gmail.com',
		contraseña: '$2b$10$WmEyn3iMrhdr.rdMogCOjuIP/DzvtUYxNz9.RJGA8yJtr85eHBTQq',
		isAdmin: false

	};

	context('When errors do not ocurrs', () => {

		it('Should return 200 if a user was created correctly', async () => {
			sandbox.stub(UsuarioModel, 'getOne').resolves(null);
			sandbox.stub(UsuarioModel.prototype, 'insert').resolves(fakeId);

			const req = mockRequest(fakeBody);
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 201);
			assert.deepStrictEqual(res.json, { code: 2, message: fakeId.insertedId });

			sandbox.assert.calledOnceWithExactly(UsuarioModel.getOne, { email: fakeBody.email });
			sandbox.assert.calledOnceWithExactly(UsuarioModel.prototype.insert);

		});

		it.only('Should return 200 if there is a user with the sent email', async () => {

			sandbox.stub(UsuarioModel, 'getOne').resolves(usuarioGetted);
			sandbox.stub(UsuarioModel.prototype, 'insert');

			const req = mockRequest(fakeBody);
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, 'el emaiil ya existe ingrese otro');

		});
	});
});
