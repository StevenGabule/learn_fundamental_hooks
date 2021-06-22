import React from "react";
import { PostContext } from "../App1";

function CreatePost({ user }) {
  const { dispatch } = React.useContext(PostContext);
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState(null);
  const imageInputRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const post = { content, image, user, id: Date.now() };
    // handleAddPost(post)
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
          onChange={(event) => setContent(event.target.value)}
        />

        <input
          ref={imageInputRef}
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <button type={"submit"}>Submit Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
