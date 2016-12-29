var fs             = require('fs'),
    express        = require('express'),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    config         = require('../config');

var app = express();

// Connect to mongodb
var connect = function() {mongoose.connect(config.db, {server: {socketOptions: {keepAlive: 1}}});};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// bodyParser should be above methodOverride
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res)
{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

import {Boot} from './src/boot';
new Boot(app);

app.listen(9000);

console.log('API v0.1 started 9000');