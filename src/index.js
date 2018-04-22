import './index.css';
//var querystring = require('querystring');

//var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
//var querystring = require('querystring');
//var cookieParser = require('cookie-parser');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret

function callShiz(){
// your application requests authorization
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

	request.post(authOptions, function(error, response, body) {
		//response.on("data", function (data) {data})
			if (!error && response.statusCode === 200) {

					// use the access token to access the Spotify Web API
					var token = body.access_token;
					var options = {
							url: 'https://api.spotify.com/v1/users/jmperezperez',
							headers: {
									'Authorization': 'Bearer ' + token
							},
							json: true
					};
					request.get(options, function(error, response, body) {
							console.log(body);
					});
			}
	});
}


//why is this not working

//

/* Old example index file
// Populate table of users via API call.

import {getUsers} from './api/userApi';

getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody+= `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`
  });

  global.document.getElementById('users').innerHTML = usersBody;
});*/
