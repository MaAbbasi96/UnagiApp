export const GET_POSTS = "get_posts";
export const SAVE_OLD_POSTS = "save_old_posts";
export const ADD_POST = "add_post";
export const GET_UNIQUE_ID = "get_unique_id";
export const LIKE_POST = "like_post";
export const UNLIKE_POST = "unlike_post";
export const SAVE_POSTS = "save_posts";
export const SAVE_HOT_POSTS = "save_hot_posts";
export const SAVE_UNIQUE_ID = "save_unique_id";
export const UPDATE_POST = "update_post";
var Helpers = require("./helpers");
var Network = require("./network");
export function getPosts() {
  return {
    type: GET_POSTS
  };
}
export function saveOldPosts(posts) {
  return {
    type: SAVE_OLD_POSTS,
    posts: posts
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
export function saveHotPosts(posts) {
  return {
    type: SAVE_HOT_POSTS,
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
export function getAndSavePosts(uniqueID, location) {
  return function(dispatch) {
    return Network.getPosts(uniqueID, location).then(
      posts => {
        dispatch(savePosts(posts));
      },
      err => console.log(err)
    );
  };
}
export function getAndSaveOldPosts(uniqueID, location, lastPostID) {
  return function(dispatch) {
    return Network.getOldPosts(uniqueID, location, lastPostID).then(
      posts => {
        dispatch(saveOldPosts(posts));
      },
      err => console.log(err)
    );
  };
}
export function getAndSaveOldHotPosts(uniqueID, location, lastPostID) {
  return function(dispatch) {
    return Network.getOldHotPosts(uniqueID, location, lastPostID).then(
      posts => {
        dispatch(saveOldPosts(posts));
      },
      err => console.log(err)
    );
  };
}
export function getAndSaveHotPosts(uniqueID, location) {
  return function(dispatch) {
    return Network.getHotPosts(uniqueID, location).then(
      posts => {
        dispatch(saveHotPosts(posts));
      },
      err => console.log(err)
    );
  };
}
export function updatePost(updatedPostID, likeStatus, likes) {
  return {
    type: UPDATE_POST,
    updatedPostID: updatedPostID,
    updatedPostLikes: likeStatus ? likes + 1 : likes - 1,
    likeStatus: likeStatus
  };
}
export function likePost(uniqueID, location, postID, likeStatus, likes) {
  return function(dispatch) {
    return Network.likePost(uniqueID, location, postID, likeStatus).then(
      res => dispatch(updatePost(postID, likeStatus, likes)),
      err => console.log(err)
    );
  };
}
