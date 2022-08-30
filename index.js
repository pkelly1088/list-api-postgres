require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const db = require('./queries');
const port = 3001;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/people', db.getUsers);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});