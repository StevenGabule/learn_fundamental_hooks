import { useEffect, useRef, useState } from 'react';

const BASE_URI = 'https://api.github.com/users';

function App() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '0',
    language: 'PhP',
    yearOfExp: '0',
    available: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [username, setUsername] = useState('');
  const usernameRef = useRef(null);
  const [user, setUser] = useState(null);

  function handleDeveloper(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  function handleMousePosition({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
    };
  }, []);

  function handleChangeLangauge() {
    setDeveloper((prev) => ({ ...prev, language: 'ReactJS/NodeJS' }));
  }

  function handleChangeAvailable() {
    setDeveloper((prev) => ({ ...prev, available: !prev.available }));
  }

  async function fetchUser() {
    const data = await (await fetch(`${BASE_URI}/${username}`)).json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearInput() {
    usernameRef.current.value = '';
    usernameRef.current.focus();
    setUser(null);
    setUsername('');
  }

  return (
    <div>
      <p>
        <button onClick={handleChangeLangauge}>Change Language</button>
        <button onClick={handleChangeAvailable}>Change Available</button>
      </p>
      <p>
        <input type="text" onChange={handleDeveloper} name="name" value={developer.name} placeholder="Enter your name" />
        <input type="number" onChange={handleDeveloper} name="age" value={developer.age} placeholder="Enter your age" />
        <input type="number" onChange={handleDeveloper} name="yearOfExp" value={developer.yearOfExp} placeholder="Number of experience" />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Language: {developer.language} <br />
        Year of experience: {developer.yearOfExp} <br />
        Available: {developer.available ? 'Yep' : 'Nope'} <br />
      </p>
      <hr />
      <p>
        Mouse position: {mousePosition.x}, {mousePosition.y}
      </p>
      <p>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} ref={usernameRef} />
        <button type="button" onClick={fetchUser}>
          Search
        </button>
        <button type="button" onClick={clearInput}>
          Clear
        </button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} style={{ width: 45 }} /> <br />
          Name: {user.name} <br />
          Bio: {user.bio} <br />
        </p>
      )}
    </div>
  );
}

export default App;
