import {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from 'react';
import postReducer from './reducer';
import Login from './Login';
import Header from './Header';
import CreateList from './CreateList';
import PostList from './PostList';

export const UserContext = createContext(undefined, undefined);
export const PostContext = createContext({ posts: [] });

function App() {
  const initialPostValue = useContext(PostContext);
  const [state, dispatch] = useReducer(postReducer, initialPostValue);
  const [user, setUser] = useState('');

  useEffect(() => {
    document.title = user ? `${user}'s feed` : 'Please Login';
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
