import postReducer from './reducer';
import Header from './Header';
import Login from './Login';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import CreateList from './CreateList';
import PostList from './PostList';

export const UserContext = createContext(undefined, undefined);
export const PostContext = createContext({ posts: [] });

function App() {
  const initialPostsValue = useContext(PostContext);
  const [state, dispatch] = useReducer(postReducer, initialPostsValue);
  const [user, setUser] = useState('');

  useEffect(() => {
    document.title = user ? `${user} feed` : 'Please login';
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />;
  }
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} />
        <CreateList user={user} />
        <PostList posts={state.posts} />
      </UserContext.Provider>
    </PostContext.Provider>
  );
}

export default App;
