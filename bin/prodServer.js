require('babel-register')

const config = require('../config')
const debug = require('debug')('app:bin:server')

const port = config.server_port
const host = config.server_host

const path = require('path');
const express = require('express')

const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(6000, host, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  debug(`Server is now running at ${host}:${port}.`)
});
