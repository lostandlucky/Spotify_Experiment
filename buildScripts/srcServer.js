/*var express = require('express');
var path = require('path');
var open = require('open');

var port = 3000;
var app = express(); */

//Use ES6 syntax
import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev'
/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler,{
	noInfo: true,
	publicPath: config.output.publicPath
}));

//Tell express which routes it should handle
//Any references to the root will be handled by this function
app.get('/', function(req, res){
    //__dirname gets the current directory name
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res){
	//Hard coding for simplicity.  Pretend this hits a real database
	res.json([
		{"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
		{"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
		{"id": 1,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
	]);
});

app.get('/gettoken', function(req, res){
	res.redirect('')
});

//Tell express that we would like it to listen to the port we defined above
app.listen(port, function(err){
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});
