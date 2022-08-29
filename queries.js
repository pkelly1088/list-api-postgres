const Pool = require('pg').Pool
const pool = new Pool({
  user: PROCESS.ENV.PG_USER,
  host: PROCESS.ENV.PG_HOST,
  database: PROCESS.ENV.PG_DATABASE,
  password: PROCESS.ENV.PG_PASSWORD,
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query(`SELECT * FROM ${PROCESS.ENV.PG_TABLE};`, (error, results) => {
        if (error) {
            throw error
        }
        response.header("Access-Control-Allow-Origin", "*")
        response.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested, Content-Type, Accept Authorization"
        )
      response.status(200).json(results.rows)
    })
  }

  module.exports = { getUsers }