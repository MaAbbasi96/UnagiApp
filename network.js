import React, { Component } from 'react';
import Fetch from 'react-native-fetch';
var serverPath = 'http://192.168.1.104:3000';
export function getPosts(unique_id, location) {
	return fetch(serverPath + '/post', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			unique_id: unique_id,
			location: JSON.stringify(location)
		}
	})
		.then(function(res) {
			return res.json();
		})
		.then(function(res) {
			return new Promise((resolve, reject) => {
				resolve(res.posts);
			});
		})
		.catch(err => {
			console.log(err);
		});
}
export function getOldPosts(unique_id, location,lastpost) {
	return fetch(serverPath + '/post', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			unique_id: unique_id,
			location: JSON.stringify(location),
			lastpost : lastpost
		}
	})
		.then(function(res) {
			return res.json();
		})
		.then(function(res) {
			return new Promise((resolve, reject) => {
				resolve(res.posts);
			});
		})
		.catch(err => {
			console.log(err);
		});
}
export function addPost(unique_id, location, text) {
	return fetch(serverPath + '/post', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			unique_id: unique_id,
			location: JSON.stringify(location)
		},
		body: JSON.stringify({
			text
		})
	})
		.then(function(res) {
			// console.log("Response" , res);
			return;
		})
		.then(function(res) {
			// func();
			return;
		})
		.catch(err => {
			console.log(err);
		});
}
export function likePost(unique_id, location, postId, like) {
	var requestMethod;
	like ? (requestMethod = 'PUT') : (requestMethod = 'DELETE');
	return fetch(serverPath + '/post/' + postId + '/like', {
		method: requestMethod,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			unique_id: unique_id,
			location: JSON.stringify(location)
		}
	})
		.then(function(res) {
			// console.log("Response" , res);
			return;
		})
		.then(function(res) {
			return;
		})
		.catch(err => {
			console.log(err);
		});
}
