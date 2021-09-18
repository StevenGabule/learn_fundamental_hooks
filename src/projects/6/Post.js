import React from 'react'
import {PostContext, UserContext} from "./App";
function Post({id, user, content, image}) {
  const currentUser = React.useContext(UserContext)
  const {dispatch} = React.useContext(PostContext)
  const isCurrentUser = currentUser === user;

  function handleDelete() {
    dispatch({type: 'DELETE_POST', payload: {id}})
  }

  return (
    <div>
      {image && (<p><img src={URL.createObjectURL(image)} alt={content}/></p>)}
      <p>{content}</p>
      <p style={{color: isCurrentUser && 'green'}}>Author: {user}</p>
      {isCurrentUser && <button onClick={handleDelete}>Remove</button>}
    </div>
  )
}

export default Post;
