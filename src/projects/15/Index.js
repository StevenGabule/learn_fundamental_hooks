import { useEffect, useRef, useState } from 'react';

const BASE_URI = 'https://api.github.com/users';

function App() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    language: 'PHP Laravel Kid',
    yearsOfExp: 5,
    availability: true,
  });
  const [username, setUsername] = useState('');
  const usernameRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState(null);

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

  function handleChangeLanguage() {
    setDeveloper((prev) => ({ ...prev, language: 'ReactJS/NextJs/Javascript' }));
  }

  function handleChangeAvailableStatus() {
    setDeveloper((prev) => ({ ...prev, availability: !prev.availability }));
  }

  function handleChangeDeveloper(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  async function fetchUser() {
    const data = await (await fetch(`${BASE_URI}/${username}`)).json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearInputs() {
    setUser(null);
    setUsername('');
    usernameRef.current.value = '';
    usernameRef.current.focus();
  }
  return (
    <div>
      <button onClick={handleChangeLanguage}>Change Language</button>
      <button onClick={handleChangeAvailableStatus}>Change Available Status</button>
      <p>
        <input type="text" onChange={handleChangeDeveloper} value={developer.name} placeholder="Name" name="name" />

        <input type="text" onChange={handleChangeDeveloper} value={developer.age} placeholder="Age" name="age" />

        <input type="text" onChange={handleChangeDeveloper} value={developer.yearsOfExp} placeholder="Years of XP" name="yearsOfExp" />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Programming Stack: {developer.language} <br />
        Number of experience: {developer.yearsOfExp} <br />
        Availability: {developer.availability ? 'Available to work' : 'Still working on progress...'} <br />
      </p>
      <p>
        Mouse position: X::{mousePosition.x}, Y::{mousePosition.y}
      </p>

      <p>
        <input type="text" name="username" ref={usernameRef} onChange={(e) => setUsername(e.target.value)} value={username} />
        <button onClick={fetchUser}>Search</button>
        <button onClick={clearInputs}>Clear</button>
      </p>
      {user && user.message !== 'Not Found' && (
        <p>
          <img src={user.avatar_url} width={50} alt={user.name} /> <br />
          Name: {user.name} <br />
          Bio: {user.bio} <br />
        </p>
      )}
    </div>
  );
}

export default App;
