import { useState, useRef, useContext } from 'react';
import { PostContext } from './App';

function CreateList({ user }) {
  const { dispatch } = useContext(PostContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const post = { id: Date.now(), user, content, image };
    dispatch({ type: 'ADD_POST', payload: { post } });
    setContent('');
    setImage(null);
    imageRef.current.value = '';
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='content'
          value={content}
          placeholder='new content'
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type='file'
          name='image'
          ref={imageRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type='submit'>Post</button>
      </form>
    </div>
  );
}

export default CreateList;
