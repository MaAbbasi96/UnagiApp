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
};

export default reducer;
