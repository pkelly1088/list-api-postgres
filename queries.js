const Pool = require('pg').Pool
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const isProduction = process.env.NODE_ENV === "production";
const pool = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL
    : connectionString,
  ssl: {
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  }
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM people;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = { getUsers }