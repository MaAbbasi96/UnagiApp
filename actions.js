export const GET_POSTS = "get_posts";
export const GET_OLDER_POSTS = "get_older_posts";
export const ADD_POST = "add_post";
export const GET_UNIQUE_ID = "get_unique_id";
export const LIKE_POST = "like_post";
export const UNLIKE_POST = "unlike_post";
export const SAVE_POSTS = "save_posts";
export const SAVE_UNIQUE_ID = "save_unique_id";
var Helpers = require("./helpers");
var Network = require("./network");
export function getPosts() {
  return {
    type: GET_POSTS
  };
}
export function getOlderPosts(postID) {
  return {
    type: GET_OLDER_POSTS,
    lastPostID: postID
  };
}
export function addPost(text) {
  return {
    type: ADD_POST,
    text: text
  };
}
export function getUniqueID() {
  return {
    type: GET_UNIQUE_ID
  };
}
export function likePost(postID) {
  return {
    type: LIKE_POST,
    postID: postID
  };
}
export function unlikePost(postID) {
  return {
    type: UNLIKE_POST,
    postID: postID
  };
}
export function savePosts(posts) {
  return {
    type: SAVE_POSTS,
    posts: posts
  };
}
export function saveUniqueID(uniqueID) {
  return {
    type: SAVE_UNIQUE_ID,
    uniqueID: uniqueID
  };
}
export function getAndSaveUniqueID() {
  return function(dispatch) {
    return Helpers.getUniqueID().then(
      uniqueID => dispatch(saveUniqueID(uniqueID)),
      err => console.log(err)
    );
  };
}
export function getAndSavePosts(uniqueID,location){

    return function(dispatch){
        return Network.getPosts(uniqueID,location).then(
            posts => {dispatch(savePosts(posts))}
            ,
            err => console.log(err))
    }
}
