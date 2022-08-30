require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./queries');
const port = process.env.PG_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/people', (req, res) => {
  db.getUsers(req, res);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});