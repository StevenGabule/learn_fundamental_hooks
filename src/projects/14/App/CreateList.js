import { useState, useRef, useContext } from 'react';
import { PostContext } from './App';

function CreateList({ user }) {
  const { dispatch } = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const imageRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const post = { id: Date.now(), title, image, user };
    dispatch({ type: 'ADD_POST', payload: { post } });
    setTitle('');
    setImage(null);
    imageRef.current.value = '';
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
      <input type="file" ref={imageRef} onChange={(e) => setImage(e.target.files[0])} name="image" />
      <button>Submit</button>
    </form>
  );
}

export default CreateList;
