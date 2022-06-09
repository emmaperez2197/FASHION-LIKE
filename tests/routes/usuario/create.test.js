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

		it('Should return 201 if a user was created correctly', async () => {
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

		it('Should return 200 if there is a user with the sent email', async () => {

			sandbox.stub(UsuarioModel, 'getOne').resolves(usuarioGetted);
			sandbox.stub(UsuarioModel.prototype, 'insert');

			const req = mockRequest(fakeBody);
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { message: `el email: ${fakeBody.email} ya esta registrado, por favor ingrese otro` });

			sandbox.assert.calledOnceWithExactly(UsuarioModel.getOne, { email: fakeBody.email });
			sandbox.assert.notCalled(UsuarioModel.prototype.insert);

		});
	});

	context('When an errors ocurrs', () => {

		it('Should return 400 if the data is invalid', async () => {
			sandbox.stub(UsuarioModel, 'getOne');
			sandbox.stub(UsuarioModel.prototype, 'insert');

			const req = mockRequest({ ...fakeBody, email: 'emmaperez2197' });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"email" must be a valid email' });

			sandbox.assert.notCalled(UsuarioModel.getOne);
			sandbox.assert.notCalled(UsuarioModel.prototype.insert);
		});

		it('Should return 400 if the data is invalid', async () => {
			sandbox.stub(UsuarioModel, 'getOne');
			sandbox.stub(UsuarioModel.prototype, 'insert');

			const req = mockRequest({ ...fakeBody, contraseña: 1 });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"contraseña" must be a string' });

			sandbox.assert.notCalled(UsuarioModel.getOne);
			sandbox.assert.notCalled(UsuarioModel.prototype.insert);
		});

		it('Should return 400 if the data is invalid', async () => {
			sandbox.stub(UsuarioModel, 'getOne');
			sandbox.stub(UsuarioModel.prototype, 'insert');

			const req = mockRequest({ ...fakeBody, isAdmin: 1 });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"isAdmin" must be a boolean' });

			sandbox.assert.notCalled(UsuarioModel.getOne);
			sandbox.assert.notCalled(UsuarioModel.prototype.insert);
		});
	});

	context('When database errors occur', () => {
		it('Should return 500 if any error occurs when trying to get a user by email', async () => {

			sandbox.stub(UsuarioModel, 'getOne').rejects(new Error('Error in getOne'));
			sandbox.stub(UsuarioModel.prototype, 'insert');

			const req = mockRequest(fakeBody);
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { message: 'Error: Error in getOne' });

			sandbox.assert.calledOnceWithExactly(UsuarioModel.getOne, { email: fakeBody.email });
			sandbox.assert.notCalled(UsuarioModel.prototype.insert);

		});
	});
});
