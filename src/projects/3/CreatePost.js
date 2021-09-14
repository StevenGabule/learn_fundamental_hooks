import React from "react";
import {PostContext} from "./App";

function CreatePost({user}) {
  const {dispatch} = React.useContext(PostContext)
  const [content, setContent] = React.useState('');
  const [image, setImage] = React.useState(null);
  const imageRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const post = {id: Date.now(), user, content, image}
    dispatch({type: 'ADD_POST', payload: {post}})
    setContent('')
    setImage(null)
    imageRef.current.value = ''
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={'add a post'} name={'content'} value={content}
               onChange={e => setContent(e.target.value)}/>
        <input ref={imageRef} type="file" onChange={e => setImage(e.target.files[0])} />
        <button type={'submit'}>Create</button>
      </form>
    </>
  )
}

export default CreatePost;
