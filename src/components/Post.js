import React from "react";
import {UserContext, PostContext} from "../App";

function Post({image, content, user, id}) {
    const currentUser = React.useContext(UserContext)
    const {dispatch} = React.useContext(PostContext)
    const isCurrentUser = currentUser === user;

    function handleDeletePostClick() {
        dispatch({type: 'DELETE_POST', payload: {id}})
    }

    return (
        <div>
            {image && (
                <img src={URL.createObjectURL(image)}
                     alt={content}
                     style={{height: 100, width: 200, objectFit: 'cover'}}/>
            )}
            <p>{content}</p>
            <p style={{color: isCurrentUser && 'green'}}>Author:{user}</p>
            {isCurrentUser && <button onClick={handleDeletePostClick}>Delete</button>}
        </div>
    )
}

export default Post;
