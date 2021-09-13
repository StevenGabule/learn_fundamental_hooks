import { useCallback, useEffect, useRef, useState } from 'react';

const baseURL = 'https://api.github.com/users';

function ExampleApp6() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    language: 'PHP',
    yearOfExp: 0,
    availability: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [username, setUsername] = useState('StevenGabule');
  const [user, setUser] = useState(null);

  const inputUsernameRef = useRef('');

  function handleClickChangeLanguage() {
    setDeveloper((prev) => ({ ...prev, language: 'JavaScript' }));
  }

  function handleClickChangeJobStatus() {
    setDeveloper((prev) => ({ ...prev, availability: !prev.availability }));
  }

  function handleChangeDeveloper(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const fetchUser = useCallback(async () => {
    const res = await fetch(`${baseURL}/${username}`);
    const data = await res.json();
    setUser(data);
  }, [username]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  function handleMouseMove({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  function clearInputs() {
    setUsername('');
    setUser(null);
    inputUsernameRef.current.value = '';
    inputUsernameRef.current.focus();
  }

  return (
    <>
      <p>
        <button onClick={handleClickChangeLanguage}>Change Language</button>
        <button onClick={handleClickChangeJobStatus}>Change Job Status</button>
      </p>
      <p>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleChangeDeveloper}
        />
        <input
          type='number'
          name='age'
          placeholder='Age'
          onChange={handleChangeDeveloper}
        />
        <input
          type='number'
          name='yearOfExp'
          placeholder='Year of experience'
          onChange={handleChangeDeveloper}
        />
      </p>

      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Programming Language: {developer.language} <br />
        Number of Experience: {developer.yearOfExp} <br />
        Availability: {developer.availability ? 'Yes' : 'Nope!'} <br />
      </p>
      <hr />
      <p>
        Mouse Position of x: {mousePosition.x}, y: {mousePosition.y}
      </p>

      <hr />

      <p>
        <input
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          ref={inputUsernameRef}
          value={username}
        />
        <button onClick={fetchUser}>Search</button>
        <button onClick={clearInputs}>Clear</button>
      </p>
      {user && (
        <p>
          <img width='50' src={user.avatar_url} alt={user.name} /> <br />
          name: {user.name} <br />
          bio: {user.bio} <br />
        </p>
      )}
    </>
  );
}

export default ExampleApp6;
