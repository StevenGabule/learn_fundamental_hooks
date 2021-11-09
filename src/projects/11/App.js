import React, { useEffect, useRef, useState } from 'react';

const baseURL = 'https://api.github.com/users';
function App() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: 0,
    language: 'PHP',
    yearOfExp: 1,
    available: false,
  });

  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const usernameRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function changeJobStatus() {
    setDeveloper((prev) => ({ ...prev, available: !prev.available }));
  }

  function changeToggleLanguage() {
    setDeveloper((prev) => ({ ...prev, language: 'ReactJS' }));
  }

  function onChangeInputDeveloper(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  function handleMouseMoveHandler({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveHandler);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveHandler);
    };
  }, []);

  async function fetchUser() {
    const data = await (await fetch(`${baseURL}/${username}`)).json();
    setUser(data);
  }

  function clearInput() {
    usernameRef.current.value = '';
    usernameRef.current.focus();
    setUsername('');
    setUser(null);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <button onClick={changeJobStatus}>Toggle Job Status</button>
      <button onClick={changeToggleLanguage}>Toggle Language</button>
      <p>
        <input
          type='text'
          onChange={onChangeInputDeveloper}
          name='name'
          value={developer.name}
          placeholder='Enter name'
        />
        <input
          type='number'
          onChange={onChangeInputDeveloper}
          name='age'
          value={developer.age}
          placeholder='Enter age'
        />

        <input
          type='number'
          onChange={onChangeInputDeveloper}
          name='yearOfExp'
          value={developer.yearOfExp}
          placeholder='Enter year of exp'
        />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Language: {developer.language} <br />
        Year of Experience: {developer.yearOfExp} <br />
        Availability: {developer.available ? 'Yes' : 'Nope!'} <br />
      </p>
      <p>
        Position of mouse: {mousePosition.x}, {mousePosition.y}
      </p>

      <div>
        <p>
          <input
            type='text'
            ref={usernameRef}
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <button onClick={fetchUser}>Search</button>
          <button onClick={clearInput}>Clear</button>
        </p>
        {user && (
          <p>
            <img src={user.avatar_url} alt={user.name} /> <br />
            Name: {user.name} <br />
            Bio: {user.bio} <br />
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
