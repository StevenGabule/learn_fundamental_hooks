import { useContext } from 'react';
import { PostContext, UserContext } from './App';

function Post({ id, user, image, title }) {
  const currentUser = useContext(UserContext);
  const { dispatch } = useContext(PostContext);
  const isCurrentUser = currentUser === user;

  function handleDeletePost() {
    dispatch({ type: 'DELETE_POST', payload: { id } });
  }

  return (
    <div>
      <p>
        {image && <img src={URL.createObjectURL(image)} alt={title} />} <br />
        Title: {title} <br />
        Author: <span style={{ color: isCurrentUser && 'green' }}>{user}</span>
        <br />
        {isCurrentUser && <button onClick={handleDeletePost}>Delete</button>}
      </p>
    </div>
  );
}

export default Post;
