import React from 'react'
import {PostContext} from './App'

function CreateList({user}) {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name={'content'} value={content} placeholder={'Add a content'} onChange={e => setContent(e.target.value)}/>
        <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])} ref={imageRef}/>
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreateList;
