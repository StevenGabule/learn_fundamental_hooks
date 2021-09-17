import React from 'react'
import {PostContext} from "./App";

function CreatePost({user}) {
  const {dispatch} = React.useContext(PostContext)
  const [content, setContent] = React.useState('');
  const [image, setImage] = React.useState(null);
  const imageRef = React.useRef(null);

  function handleAddPost(e) {
    e.preventDefault();
    const post = {id: Date.now(), user, content, image}
    dispatch({type: 'ADD_POST', payload: {post}})
    setContent('')
    setImage(null)
    imageRef.current.value =''
  }

  return (
    <>
      <form onSubmit={handleAddPost}>
        <input type="text"
               placeholder={'Enter name'}
               value={content}
               name={'content'}
               onChange={e => setContent(e.target.value)}/>
        <input type="file" name="image" id="image" ref={imageRef} onChange={e => setImage(e.target.files[0])}/>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreatePost;
