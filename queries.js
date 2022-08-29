const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'shoppers',
  password: 'password',
  port: 5432,
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