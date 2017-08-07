import React, { Component } from "react";
import Fetch from "react-native-fetch";
var serverPath = "http://192.168.11.201:3000";
export function getPosts(location, accessToken, refreshToken) {
    return fetch(serverPath + "/post", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            location: JSON.stringify(location),
            accesstoken: accessToken,
            refreshtoken: refreshToken
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
export function login(username, password) {
    return fetch(serverPath + "/auth/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            type: "password"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        })
        .catch(err => {
            console.log(err);
        });
}
export function loginWithToken(refreshToken, accessToken) {
    console.log("Refresh token", refreshToken);
    return fetch(serverPath + "/auth/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            type: "token",
            refreshtoken: refreshToken,
            accesstoken: accessToken
        },
        body: JSON.stringify({
            username: "a",
            password: "a"
        })
    })
        .then(function(res) {
            console.log("RRRRRRRRRRRRRRRRRRRRR", res);
            return res.json();
        })
        .then(function(res) {
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        })
        .catch(err => {
            console.log(err);
        });
}
export function signup(username, password) {
    return fetch(serverPath + "/auth/register ", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            return new Promise((resolve, reject) => {
                resolve(res);
                if (res.message === "ok") resolve(res);
                else resolve(res);
            });
        })
        .catch(err => {
            console.log(err);
        });
}
export function getOldPosts(unique_id, location, lastpost) {
    return fetch(serverPath + "/post", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            unique_id: unique_id,
            location: JSON.stringify(location),
            lastpost: lastpost
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
export function addPost(accessToken, refreshToken, location, text) {
    return fetch(serverPath + "/post", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            accesstoken: accessToken,
            refreshtoken: refreshToken,
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
export function likePost(accessToken, refreshToken, location, postId, like) {
    var requestMethod;
    like ? (requestMethod = "PUT") : (requestMethod = "DELETE");
    return fetch(serverPath + "/post/" + postId + "/like", {
        method: requestMethod,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            accesstoken: accessToken,
            refreshtoken: refreshToken,
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
export function getHotPosts(location, accessToken, refreshToken) {
    console.log("parameters", location, accessToken, refreshToken);
    return fetch(serverPath + "/post/hot", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            location: JSON.stringify(location),
            accesstoken: accessToken,
            refreshtoken: refreshToken
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
export function getOldHotPosts(unique_id, location, lastpost) {
    return fetch(serverPath + "/post/hot", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            unique_id: unique_id,
            location: JSON.stringify(location),
            lastpost: lastpost
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
