import { useEffect, useRef, useState } from 'react';
import './bg.css';
const baseURL = 'https://api.github.com/users';

function ExampleApp4() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    yearsOfExperience: 0,
    language: 'PHP',
    isEmployed: false,
  });

  const [username, setUsername] = useState('stevengabule');
  const usernameRef = useRef();
  const [user, setUser] = useState(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  function handleChangeDeveloper(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  function handleClickLanguage() {
    setDeveloper((prev) => ({ ...prev, language: 'JavaScript' }));
  }

  function handleClickJobStatusChange() {
    setDeveloper((prev) => ({ ...prev, isEmployed: !prev.isEmployed }));
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    fetchUser();
  }, []);

  function handleMouseMove({ x, y }) {
    setMousePosition({ x, y });
  }

  async function fetchUser() {
    const res = await fetch(`${baseURL}/${username}`);
    const data = await res.json();
    setUser(data);
  }

  function clearUsernameInput() {
    setUsername('');
    setUser(null);
    usernameRef.current.value = '';
    usernameRef.current.focus();
  }

  return (
    <div>
      <p>
        <button type='button' onClick={handleClickLanguage}>
          Change Language
        </button>
        <button type='button' onClick={handleClickJobStatusChange}>
          Change Job Status
        </button>
      </p>
      <p>
        <input
          type='text'
          name='name'
          onChange={handleChangeDeveloper}
          placeholder='Enter name'
        />
        <input
          type='number'
          name='age'
          onChange={handleChangeDeveloper}
          placeholder='Enter age'
        />
        <input
          type='number'
          name='yearsOfExperience'
          onChange={handleChangeDeveloper}
          placeholder='Year of experience'
        />
      </p>
      <p>
        Name: {developer.name}
        <br />
        Age: {developer.age}
        <br />
        Year of experience: {developer.yearsOfExperience}
        <br />
        Langauge: {developer.language}
        <br />
        Availability to work: {developer.isEmployed ? 'Yes' : 'Nope!'}
        <br />
      </p>
      <hr />
      <h3>Mouse Position</h3>
      <p>
        Position x: {mousePosition.x}, Position y: {mousePosition.y}
      </p>

      <h3>Search Github</h3>
      <p>
        <input
          type='text'
          name='search'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameRef}
        />
        <button type='button' onClick={fetchUser}>
          Search
        </button>
        <button type='button' onClick={clearUsernameInput}>
          Clear
        </button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} width='110' />
          <br />
          name: {user.name} <br />
          bio: {user.bio} <br />
        </p>
      )}
    </div>
  );
}

export default ExampleApp4;
