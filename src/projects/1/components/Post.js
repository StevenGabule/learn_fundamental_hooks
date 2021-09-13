import React, {useContext} from "react";
import {PostContext, UserContext} from '../App'

function Post({content, user, id, image}) {
  const currentUser = useContext(UserContext);
  const {dispatch} = useContext(PostContext)
  const isCurrentUser = currentUser === user;

  function handleDelete() {
    dispatch({type: 'DELETE_POST', payload: {id}})
  }

  return (
    <div>
      {image && <img src={URL.createObjectURL(image)} alt={content}/>}
      <p>{content}</p>
      <p style={{color: isCurrentUser && 'green'}}>Author: {user}</p>
      {isCurrentUser && <button onClick={handleDelete}>Remove</button>}
    </div>
  )
}

export default Post;
