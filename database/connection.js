require('dotenv').config()
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.DBHOST,
      user : process.env.DBUSER,
      password : process.env.DBPASSWORD,
      database : process.env.DATABASE
    }
  });

module.exports = knex