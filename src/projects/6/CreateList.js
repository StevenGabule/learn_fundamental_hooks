import React from 'react'
import {PostContext} from "./App";

function CreateList({user}) {
  const {dispatch} = React.useContext(PostContext)
  const [content, setContent] = React.useState('');
  const [image, setImage] = React.useState(null);
  const imageRef = React.useRef(null);

  function handlePost(e) {
    e.preventDefault();
    const post = {id: Date.now(), user, image, content}
    dispatch({type: 'ADD_POST', payload: {post}})
    setContent('')
    setImage(null)
    imageRef.current.value = ''
  }

  return (<div>
    <form onSubmit={handlePost}>
      <input type="text" onChange={e => setContent(e.target.value)} value={content} placeholder={'Create a post'}/>
      <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])} ref={imageRef}/>
      <button type="submit">Submit</button>
    </form>
  </div>)
}

export default CreateList;
