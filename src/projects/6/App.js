import React, {createContext, useContext, useState, useEffect} from "react";
import postReducer  from './reducer'
import Login from "./Login";
import Header from "./Header";
import CreateList from "./CreateList";
import PostList from "./PostLIst";

export const UserContext = createContext(undefined, undefined)
export const PostContext = createContext({posts: []})

function App() {
  const initialPostValue = useContext(PostContext)
  const [state, dispatch] = React.useReducer(postReducer, initialPostValue)
  const [user, setUser] = useState('');

  useEffect(() => {
    document.title = user ? `${user}'s feed` : 'Please login'
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />
  }

  return (
    <PostContext.Provider value={{state, dispatch}}>
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} />
        <CreateList user={user} />
        <PostList posts={state.posts} />
      </UserContext.Provider>
    </PostContext.Provider>
  )

}

export default App;
