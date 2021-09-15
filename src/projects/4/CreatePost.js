import React, {useContext} from 'react'
import {PostContext} from './App'


function CreatePost({user}) {
  const {dispatch} = useContext(PostContext)
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
        <input type="text" name={'content'} onChange={e => setContent(e.target.value)} value={content}/>
        <input type="file" name={'image'} ref={imageRef} onChange={e => setImage(e.target.files[0])}/>
        <button type="submit">Create</button>
      </form>
    </div>
  )

}

export default CreatePost;
