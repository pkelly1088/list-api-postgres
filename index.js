require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = process.env.PG_PORT || 3001;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/people', db.getUsers);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});