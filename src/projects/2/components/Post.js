import React from "react";
import {PostContext, UserContext} from "../App";

function Post({id, user, image, content}) {
  const currentUser = React.useContext(UserContext);
  const {dispatch} = React.useContext(PostContext);
  const isCurrentUser = currentUser === user;

  function handleDeletePost() {
    dispatch({type: 'DELETE_POST', payload: {id}})
  }

  return (
    <div>
      {image && <img src={URL.createObjectURL(image)} alt={user} />}
      <p>{content}</p>
      <p style={{color: isCurrentUser && 'green'}}>{user}</p>
      {isCurrentUser && <button onClick={handleDeletePost}>Remove</button>}
    </div>
  )
}

export default Post;
