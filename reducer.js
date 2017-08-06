import { addPost, getPosts, getOlderPosts, likePost } from "./network";
import { getUniqueID } from "./helpers";

const reducer = (state, action) => {
  if (action.type === "get_posts") {
    getPosts(state.unique_id, myLocation).then(res => {
      return { ...state, items: res };
    });
  }
  if (action.type === "add_post") {
    addPost(state.unique_id, myLocation, action.text).then(res => {
      return { ...state, sendPostResponse: "ok" };
    });
  }
  if (action.type === "get_unique_id") {
    var uniqueID = getUniqueID();
    return { ...state, unique_id: uniqueID };
  }
  if (action.type === "like_post") {
    likePost(state.unique_id, myLocation, action.postID, true);
  }
  if (action.type === "unlike_post") {
    likePost(state.unique_id, myLocation, action.postID, false);
  }
  if (action.type === "set_location"){
    return ({...state,'location' : action.location});
  }
  if (action.type === "save_posts") {
    return { ...state, items: action.posts };
  }
  if (action.type == "save_unique_id") {
    return { ...state, unique_id: action.uniqueID };
  }
  if (action.type === "save_old_posts") {
    var newItems = state.items.concat(action.posts);
    return { ...state, items: newItems };
  }
  if(action.type === "save_old_hot_posts"){
    var newItems = state.hotItems.concat(action.posts);
    return {...state,hotItems : newItems};
  }
  if (action.type === "save_hot_posts") {
    return { ...state, hotItems: action.posts };
  }
  if (action.type === "signup_waiting"){
    return {...state, signupWaiting : true}
  }
  if (action.type === "signup_fail"){
    return {...state, signupWaiting : false ,signupStatus : false}
  }
  if (action.type === "signup_done"){
    return {...state, signupWaiting : false ,signupStatus : true}
  }
  if (action.type === "login_waiting"){
    return {...state, loginWaiting : true};
  }
  if (action.type === "login_fail"){
    return {...state, loginWaiting : false, loginStatus : false}
  }
  if (action.type === "login_done"){
    return {...state, loginWaiting : false, loginStatus : true}
  }
  if (action.type === "update_post") {
    var postsArray = Array.prototype.slice.call(state.items);
    for (var i = 0; i < postsArray.length; i++) {
      if (postsArray[i]._id === action.updatedPostID) {
        postsArray[i].isLiked = action.likeStatus;
        postsArray[i].likes = action.updatedPostLikes;
      }
    }
    if (!state.hotItems) return { ...state, items: postsArray };
    state = { ...state, items: postsArray };
    var postsArray = Array.prototype.slice.call(state.hotItems);
    for (var i = 0; i < postsArray.length; i++) {
      if (postsArray[i]._id === action.updatedPostID) {
        postsArray[i].isLiked = action.likeStatus;
        postsArray[i].likes = action.updatedPostLikes;
      }
    }
    return { ...state, hotItems: postsArray };
  }
};

export default reducer;
