const express = require('express');
const knex = require('knex');

const server = express();
const PORT = 5000;

server.use(express.json());

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})