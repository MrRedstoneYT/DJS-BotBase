const express = require('express');
const path = require('path');
const config = require('./config.json')
const server = express();
const port = 3000;

const staticPath = path.join(__dirname, "./web")
server.use(express.static(staticPath))

function KeepAlive(){
  server.listen(port, ()=> {console.log(config.message)})
}

module.exports = KeepAlive;