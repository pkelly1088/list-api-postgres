require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const db = require('./queries');
const port = process.env.PG_PORT || 3001;

app.use(morgan("dev"));
app.use(express.json())
app.use(cors());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (request.method === "OPTIONS") {
    response.header(
    "Access-Control-Allow-Methods",
    "POST, PUT, PATCH, GET, DELETE"
    )
  }
  next();
});

app.get('/people', db.getUsers);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});