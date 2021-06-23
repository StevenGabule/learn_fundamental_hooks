import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import postReducer from "./reducer";

// const functionsCount = new Set();
export const UserContext = createContext(undefined, undefined);

export const PostContext = createContext({ posts: [] });

function App() {
  const initialPostState = useContext(PostContext);
  const [state, dispatch] = useReducer(postReducer, initialPostState);
  const [user, setUser] = useState("john");
  // const [posts, setPosts] = useState([]);
  // const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = user ? `${user}'s feed` : "Please Login";
  }, [user]);

  /*const handleAddPost = React.useCallback(
        newPost => {
            setPosts([newPost, ...posts]);
        },
        [posts]
    );*/

  // functionsCount.add(handleAddPost)
  // console.log(functionsCount)

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} />
        <CreatePost user={user} /> {/*handleAddPost={handleAddPost}*/}
        <PostList posts={state.posts} />
        {/*<button onClick={() => setCount(prev => prev + 1)}>{count}+</button>*/}
      </UserContext.Provider>
    </PostContext.Provider>
  );
}

export default App;
