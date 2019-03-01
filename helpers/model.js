const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    getProject: (id) => {
        if(id) {
            return db('projects').where('id', id)
        }
        return db('projects')
    },

    addProject: (project) => {
        return db('projects').insert(project)
    },

    getAction: (id) => {
        if(id) {
            return db('actions').where('project_id', id)
        }
        return db('actions')
    },

    addAction: (action) => {
        return db('actions').insert(action)
    }
}