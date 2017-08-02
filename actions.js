export const GET_POSTS = 'get_posts';
export const GET_OLDER_POST = 'get_older_posts';s
export const ADD_POST = 'add_post';
export const GET_UNIQUE_ID = 'get_unique_id';
export const LIKE_POST = 'like_post';
export const UNLIKE_POST = 'unlike_post';
export function getPosts(){
    return{
        type : GET_POSTS
    }
}
export function getOlderPosts(postID){
    return ({
        type : GET_OLDER_POSTS,
        lastPostID : postID
    });
}
export function addPost(text){
    return ({
        type : ADD_POST,
        text : text
    });
}
export function GetUniqueID(){
    return ({
        type : GET_UNIQUE_ID
    });
}
export function likePost(postID){
    return ({
        type : LIKE_POST,
        postID : postID
    });
}
export function unlikePost(postID){
    return ({
        type : UNLIKE_POST,
        postID : postID
    });
}