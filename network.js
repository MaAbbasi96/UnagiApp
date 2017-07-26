import React, { Component } from "react";
import Fetch from "react-native-fetch";

domain = "192.168.209.2";
export function getPosts(unique_id, location) {
  return fetch("http://" + domain + ":3000/post/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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

export function addPost(unique_id, location, text,func) {
  if (!text) console.warn("empty text!");
  else
    return fetch("http://" + domain + ":3000/post/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        unique_id: unique_id,
        location: JSON.stringify(location)
      },
      body: JSON.stringify({
        text
      })
    })
      .then(function(res) {
        func();
        return;
      })
      .catch(err => {
        console.log(err);
      });
}
