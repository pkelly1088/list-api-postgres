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
      response.header("Access-Control-Allow-Origin", "*")
      response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (request.method === "OPTIONS") {
        response.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
    )
    return response.status(200).json(results.rows)
  }
      response.status(200).json(results.rows)
    })
  }

  module.exports = { getUsers }