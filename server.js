'use strict';

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var bodyParser = require('body-parser')

var config = require('./webpack.config');

var dao = require('./dao');

var host = '127.0.0.1';
var port = 8080;

var server = express();

server.use( bodyParser.json() );

server.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

server.post('/api/point', function(req, res) {
  var point = dao.save(req.body);

  res.send(point);
});

server.get('/api/point', function(req, res) {
  res.send(dao.list());
});

server.get('/api/point/:id', function(req, res) {
  res.send(dao.find(req.params.id));
});

server.delete('/api/point/:id', function(req, res) {
  res.send(dao.remove(req.params.id));
});

server.get('/*', function(req, res) {
  res.sendFile(config.resolve.root + '/index.html');
});

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  quiet: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  },
  stats: {
    colors: false
  }
}).listen(8081, host, function(err) {
  if (err) {
    console.log(err);
  }
});

server.listen(port);

console.log('Listening at ' + host + ':' + port);
