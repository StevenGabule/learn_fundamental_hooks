import React from "react";
import {PostContext} from "../App";

function CreatePost({user}) {
  const {dispatch} = React.useContext(PostContext);
  const [image, setImage] = React.useState(null);
  const [content, setContent] = React.useState('');
  const imageRef = React.useRef(null)

  function handleSubmit(e) {
    e.preventDefault();
    const post = {id: Date.now(), content, image, user};
    dispatch({type: "ADD_POST", payload: {post}})
    setContent('')
    imageRef.current.value = ''
    setImage(null)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder={'Add a new post'}/>
        <input ref={imageRef}  type="file" name={'image'} onChange={(e) => setImage(e.target.files[0])}/>
        <button type={'submit'}>Create</button>
      </form>
    </div>
  )
}

export default CreatePost;
