import React, {useContext, useState, useRef} from "react";
import {PostContext} from '../App'
function CreatePost({user}) {
  const {dispatch} = useContext(PostContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    const post = {image, content, id: Date.now(), user}
    dispatch({type: "ADD_POST", payload: {post}})
    setContent('')
    setImage(null)
    imageInputRef.current.value =''
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <input type="text"
                 name={'content'}
                 placeholder={'Add a new post'}
                 value={content}
                 onChange={(e) => setContent(e.target.value)}/>
          <input ref={imageInputRef} type="file" onChange={(e) => setImage(e.target.files[0]) }/>
          <button type={'submit'}>Create</button>
        </p>
      </form>
    </div>
  )
}

export default CreatePost;
