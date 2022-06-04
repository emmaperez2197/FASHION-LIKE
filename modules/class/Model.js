// const mongodb = require('mongodb');
const Mongo = require('../database/Mongo');

const mongo = new Mongo();

class Model {

	static get collection() {
		return 'default';
	}

	get collection() {
		return 'default';
	}

	static get statuses() {
		return {
			active: 'active',
			inactive: 'inactive'
		};
	}

	async insert() {
		const db = await mongo.connect();

		try {
			return	db.collection(this.collection).insertOne(this);
		} catch(error) {
			return error.message;
		}
	}

	static async getOne(filters) {
		if(!Object.keys(filters))
			throw new Error('no se recibieron filtros');

		const db = await mongo.connect();

		try {
			db.collection(this.collection).findOne(filters);
		} catch(error) {
			return error.message;
		}
	}
}

module.exports = Model;
