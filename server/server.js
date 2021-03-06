const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const parser = require('body-parser');
const port = process.env.PORT || 8080;
const path = require('path')

const controller = require('./controller.js');
const wordLib = ["<p>Some html</p>", "<p>Random html</p>", "<p>PolarPro html</p>", "<p>PolarPro rocks!</p>"]

// Parses incoming requests with JSON payloads
app.use(parser.json())
app.use(parser.urlencoded({extended: true}));

app.use(morgan('dev'));

// CORS MIDDLEWARE <3
app.use(cors());

app.use('/test', express.static(path.resolve(__dirname, "../client/dist")));

let getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/test/getTest', (req, res) => {
  let testStr = '';
  for (let i = 0; i < 20; i++) {
    testStr += wordLib[getRandomInt(4)];
  }
  res.status(200).send(testStr)
})

app.listen(port, '0.0.0.0', () => {
  console.log("The test server is running! Listening to...", port)
})