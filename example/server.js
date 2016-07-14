var server = require('paeonia-server')
var config = require('./config.json')
var fs = require('fs')

server.start(config, __dirname)

fs.createWriteStream("cmd/pids", {
flags: "a",
encoding: "utf-8",
mode: 0666
}).write(process.pid + "\n");

