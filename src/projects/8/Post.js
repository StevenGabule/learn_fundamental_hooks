import { useContext } from 'react';
import { PostContext, UserContext } from './App';

function Post({ id, user, image, content }) {
  const currentUser = useContext(UserContext);
  const { dispatch } = useContext(PostContext);
  const isCurrentUser = currentUser === user;

  function handleRemovePost() {
    dispatch({ type: 'DELETE_POST', payload: { id } });
  }

  return (
    <div>
      <p>
        {image && <img src={URL.createObjectURL(image)} alt={content} />} <br />
        Title: {content} <br />
        Author: <span style={{ color: isCurrentUser && 'green' }}>
          {' '}
          {user}
        </span>{' '}
        <br />
        {isCurrentUser && <button onClick={handleRemovePost}>Remove</button>}
      </p>
    </div>
  );
}

export default Post;
