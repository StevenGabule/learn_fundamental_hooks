import React, {useContext,createContext, useState, useReducer} from "react";
import postReducer from "./reducer/postReducer";
import Login from "./components/Login";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

export const UserContext = createContext(undefined, undefined);
export const PostContext = createContext({posts: []});
function App() {
  const initialPostState = useContext(PostContext)
  const [state, dispatch] = useReducer(postReducer, initialPostState);
  const [user, setUser] = useState('');

  React.useEffect(() => {
    document.title = user ? `${user} feeds` : 'Please login'
  },[user])

  if(!user) {
    return <Login setUser={setUser} />
  }

  return (
    <PostContext.Provider value={{state, dispatch}}>
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} />
        <CreatePost user={user} />
        <PostList posts={state.posts} />
      </UserContext.Provider>
    </PostContext.Provider>
  )
}

export default App;
