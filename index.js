const express = require('express');
const knex = require('knex');


const server = express();
const PORT = 5000;

const actionRoutes = require('./routes/actionRoutes')
const projectRoutes = require('./routes/projectRoutes');

server.use(express.json());

server.use('/api/actions', actionRoutes)
server.use('/api/projects', projectRoutes);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})