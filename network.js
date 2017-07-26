import React, { Component } from 'react';
import Fetch from 'react-native-fetch';
var serverPath = "http://192.168.11.201:3000"
export function getPosts(unique_id,location){
    return fetch(serverPath + '/post', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'unique_id': unique_id,
            'location': JSON.stringify(location)
        },
    }).then(function(res){
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


export function addPost(unique_id,location,text){
    console.log("SentText : "+ text);
    console.log("Unique id " , unique_id);

    return fetch(serverPath + '/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'unique_id': unique_id,
            'location': JSON.stringify(location)
        },
        body: JSON.stringify({
            text
        })
    }).then(function(res){
        // console.log("Response" , res);
        return;
    })
      .then(function(res) {
        func();
        return;
      })
      .catch(err => {
        console.log(err);
      });
}
