import React, { useEffect, useState } from 'react';

const baseUri = 'https://api.github.com/users';

function AppMap() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: 0,
    language: 'PHP Laravel',
    yearOfExp: 0,
    available: false,
  });

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const usernameRef = React.useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
    };
  }, [developer.name]);

  useEffect(() => {
    fetchRepoUser();
  }, []);

  async function fetchRepoUser() {
    setUser(await (await fetch(`${baseUri}/${username}`)).json());
  }

  function handleMousePosition({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  function clearInput() {
    setUser(null);
    setUsername('');
    usernameRef.current.value = '';
    usernameRef.current.focus();
  }

  return (
    <div>
      <p>
        <button
          onClick={() =>
            setDeveloper((prev) => ({ ...prev, language: 'ReactJS' }))
          }
        >
          Change language
        </button>
        <button
          onClick={() =>
            setDeveloper((prev) => ({ ...prev, available: !prev.available }))
          }
        >
          Change Available
        </button>
      </p>
      <p>
        <input
          type='text'
          placeholder='Enter name'
          name='name'
          onChange={handleChange}
          value={developer.name}
        />

        <input
          type='number'
          placeholder='Enter age'
          onChange={handleChange}
          name='age'
          value={developer.age}
        />

        <input
          type='number'
          placeholder='Enter number of years'
          onChange={handleChange}
          name='yearOfExp'
          value={developer.yearOfExp}
        />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Language: {developer.language} <br />
        Years of Experience: {developer.yearOfExp} <br />
        Available: {developer.available ? 'Yes' : 'No'}
      </p>
      <p>
        Mouse Position x: {mousePosition.x}, y: {mousePosition.y}
      </p>
      <h4>Search user</h4>
      <p>
        <input
          type='text'
          ref={usernameRef}
          value={username}
          name='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchRepoUser}>Search</button>
        <button onClick={clearInput}>Clear</button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} width='50' /> <br />
          Name: {user.name} <br />
          Biography: {user.bio} <br />
        </p>
      )}
    </div>
  );
}

export default AppMap;
