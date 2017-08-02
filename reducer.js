import { addPost,getPosts,getOlderPosts,likePost } from './network';
import {getUniqueID} from './helpers';

const reducer = (state,action) => {
    if(action.type === 'get_posts'){
        getPosts(state.unique_id,myLocation)
        .then(res => {
            return ({...state,'items' : res});
        })
    }
    if (action.type === 'get_older_posts'){
        getOlderPosts(state.unique_id,myLocation,action.lastPostID)
        .then((res)=>{
            var newItems = state.items.concat(res);
            return newItems;
        })
    }
    if (action.type === 'add_post'){
        addPost(state.unique_id,myLocation,action.text)
        .then(res=>{
            return ({...state,'sendPostResponse' : 'ok'});
        })
    }
    if (action.type === 'get_unique_id'){
        var uniqueID = getUniqueID();
        return ({...state,'unique_id' : uniqueID});
    }
    if (action.type === 'like_post'){
        likePost(state.unique_id,myLocation,action.postID,true);
    }
    if (action.type === 'unlike_post'){
        likePost(state.unique_id,myLocation,action.postID,false);
    }
    if (action.type === 'save_posts'){
        return ({...state,'items' : action.posts});
    }
    if (action.type == 'save_unique_id'){
        return ({...state,'unique_id' : action.uniqueID})
    }
};

export default reducer




// const reducer2 = (state = { todos: [] }, action) => {
//     console.log('CALLED', action);
//     if (action.type === 'add_todo') {
//         return Object.assign({}, state, {
//             todos: [...state.todos, {
//                 id: Date.now(),
//                 text: action.text
//             }]
//         })
//     }
//     return state
// }