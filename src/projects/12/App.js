import { useEffect, useRef, useState } from 'react';

const BASE_URI = 'https://api.github.com/users';

function App() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    yearOfExp: '',
    available: false,
    language: 'PHP',
  });

  const [username, setUsername] = useState('');
  const usernameRef = useRef(null);
  const [user, setUser] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function handleChangeLanguage() {
    setDeveloper((prev) => ({ ...prev, language: 'REACT_JS' }));
  }

  function handleChangeJobStatus() {
    setDeveloper((prev) => ({ ...prev, available: !prev.available }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  async function fetchUser() {
    const data = await (await fetch(`${BASE_URI}/${username}`)).json();
    setUser(data);
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  function handleMouseMove({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      <p>
        <button onClick={handleChangeLanguage}>Change Language</button>
        <button onClick={handleChangeJobStatus}>Change Job Status</button>
      </p>
      <p>
        <input
          name='name'
          id='name'
          onChange={handleChange}
          value={developer.name}
          placeholder='Enter name'
        />

        <input
          name='age'
          id='age'
          onChange={handleChange}
          value={developer.age}
          placeholder='Enter age'
        />

        <input
          name='yearOfExp'
          id='yearOfExp'
          onChange={handleChange}
          value={developer.yearOfExp}
          placeholder='Number of experience'
        />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Language: {developer.language} <br />
        Years of Experience: {developer.yearOfExp} <br />
        Available: {developer.available ? 'Yep!' : 'Nope!'} <br />
      </p>
      <br />
      <hr />
      <br />
      <p>
        Mouse position: x:: {mousePosition.x} y:: {mousePosition.y}
      </p>
      <br />
      <hr />
      <br />
      <p>
        <input
          name='username'
          value={username}
          ref={usernameRef}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchUser}>Submmit</button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} style={{ width: 50 }} />{' '}
          <br />
          Name: {user.name} <br />
          Bio: {user.bio} <br />
        </p>
      )}
    </div>
  );
}

export default App;
