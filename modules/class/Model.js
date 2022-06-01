const mongodb = require('mongodb')
const Mongo = require('../database/Mongo')

const mongo = new Mongo();


class Model {
    
    static get collection(){
        return 'default'
    }
    get collection(){
        return 'default'
    }


    static get statuses(){
        return {
            active: 'active',
            inactive: 'inactive'
        }
    }

}

module.exports = Model