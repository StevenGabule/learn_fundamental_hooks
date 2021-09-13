import React, { useContext, useRef, useState } from "react";
import { PostContext } from "../Apps/App1";

function CreatePost({ user }) {
  const { dispatch } = useContext(PostContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const post = { content, image, user, id: Date.now() };
    dispatch({ type: "ADD_POST", payload: { post } });
    setContent("");
    setImage("");
    imageInputRef.current.value = "";
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          placeholder={"Add post content"}
          onChange={({ target }) => setContent(target.value)}
        />

        <input
          ref={imageInputRef}
          type="file"
          onChange={({ target }) => setImage(target.files[0])}
        />
        <button type={"submit"}>Submit Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
