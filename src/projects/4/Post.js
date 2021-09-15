import React from "react";
import {PostContext, UserContext} from "./App";

function Post({id, user, content, image}) {
  const {dispatch} = React.useContext(PostContext)
  const currentUser = React.useContext(UserContext)
  const isCurrentUser = currentUser === user;

  function handleRemovePost() {
    dispatch({type: 'DELETE_POST', payload: {id}})
  }

  return (
    <div>
      {image && <img src={URL.createObjectURL(image)} alt={content} />} <br />
      <p>{content}</p>
      <p style={{ color: isCurrentUser && 'green' }}>Author: {user}</p><br />
      {isCurrentUser && <button onClick={handleRemovePost}>Remove</button>}
    </div>
  )
}

export default Post;
