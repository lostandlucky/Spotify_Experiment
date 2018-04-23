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
import config from '../webpack.config.dev';

import request from 'request';

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

	console.log('inside the GET call now')
	var client_id = '375b888080cf42e0a0ec358d592e3fe4';
	var client_secret = '01171107afd74db8a7856ff00bdbd355';

	console.log('setting up authOptions');
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		},
		form: {
			grant_type: 'client_credentials'
		},
		json: true
	};

	console.log('about to request the post')
	request.post(authOptions, function(error, response, body){
		if (!error && response.statusCode === 200) {
			console.log('sucess!!');

			var token = body.access_token;
			console.log(token);
			res.end(token);
		}
	});
});

//Tell express that we would like it to listen to the port we defined above
app.listen(port, function(err){
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});
