'use strict';

var _ = require('underscore');
var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var config = require('./webpack.config');

var dao = require('./dao');

var host = '127.0.0.1';
var port = 8080;

var server = express();

server.use(cookieSession({
  name: 'session',
  keys: ['userid']
}))

server.use( bodyParser.json() );

server.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

var basicAuth = require('basic-auth');

var users = [{
  name: 'a',
  pass: '1',
  _id : '1'
},{
  name: 'b',
  pass: '2',
  _id : '2'
}]

function _findUser(username, password) {
  return _.findWhere(users, {
    name : username,
    pass : password
  });
}

function auth(req, res, next) {
  if (req.session && req.session.userid) {
    return next();
  }
  return unauthorized(res);
}

function unauthorized(res) {
  return res.send(401);
}

server.put('/session', function(req, res) {
  var user = _findUser(req.body.username, req.body.password);
  if (user) {
    req.session.userid = user._id;
    res.send({});
  } else if (req.session.user) {
    res.send({});
  } else {
    return unauthorized(res);
  }
});

server.delete('/session', function(req, res) {
  req.session = null;
  res.send({});
});

server.post('/api/point', auth, function(req, res) {
  var point = dao.save(req.session.userid, req.body);

  res.send(point);
});

server.get('/api/point', auth, function(req, res) {
  res.send(dao.list(req.session.userid));
});

server.get('/api/point/:id', auth, function(req, res) {
  res.send(dao.find(req.session.userid, req.params.id));
});

server.delete('/api/point/:id', auth, function(req, res) {
  res.send(dao.remove(req.session.userid, req.params.id));
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
