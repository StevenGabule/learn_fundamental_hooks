import React from 'react'
import {UserContext, PostContext} from './App'

function Post({id, user, image, content}) {
  const currentUser = React.useContext(UserContext);
  const {dispatch} = React.useContext(PostContext)
  const isCurrentUser = currentUser === user;

  function handleRemovePost() {
    dispatch({type: 'DELETE_POST', payload: {id}})
  }

  return (
    <div>
      {image && (<p><img src={URL.createObjectURL(image)} alt={content}/></p>)}
      <p>{content}</p>
      <p style={{ color: isCurrentUser && 'green'}}>Author: {user}</p>
      {isCurrentUser && <button onClick={handleRemovePost}>Remove</button>}
    </div>
  )
}

export default Post;
