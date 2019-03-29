// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/rdbms.sqlite3'
    },
    useNullAsDefault: true,
  },
  pool: {
  afterCreate: (conn, done) => {
    // funs after a connection is made to the sqlite engine
    conn.run('PRAGMA foreign_keys = ON', done);
  },
},
  migrations: {
  directory: './data/migrations',
  tableName: 'knex_migrations',
},
  seeds: {
  directory: './data/seeds',
  },
};
