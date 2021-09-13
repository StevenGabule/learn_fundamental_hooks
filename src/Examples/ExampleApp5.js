import { useState, useEffect, useRef } from 'react';

const baseUrl = 'https://api.github.com/users';

function ExampleApp5() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    language: 'PHP',
    availability: false,
    yearOfExperience: 0,
  });

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const inputUsernameRef = useRef();

  const [username, setUsername] = useState('stevengabule');
  const [user, setUser] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({ ...prev, [name]: value }));
  }

  function hancleClickChangeLanguage(e) {
    setDeveloper((prev) => ({ ...prev, language: 'JavaScript' }));
  }

  function hancleClickChangeAvailability(e) {
    setDeveloper((prev) => ({ ...prev, availability: !prev.availability }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const res = await fetch(`${baseUrl}/${username}`);
    const data = await res.json();
    setUser(data);
  }

  function handleMouseMove({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  function handleclearInput() {
    setUser(null);
    setUsername('');
    inputUsernameRef.current.value = '';
    inputUsernameRef.current.focus();
  }

  return (
    <div>
      <p>
        <button type='button' onClick={hancleClickChangeLanguage}>
          Change language
        </button>
        <button type='button' onClick={hancleClickChangeAvailability}>
          Change Availability
        </button>
      </p>
      <p>
        <input
          type='text'
          name='name'
          placeholder='Enter name'
          value={developer.name}
          onChange={handleChange}
        />
        <input
          type='number'
          name='age'
          placeholder='Number of age'
          value={developer.age}
          onChange={handleChange}
        />
        <input
          type='number'
          name='yearOfExperience'
          placeholder='Number of years'
          value={developer.yearOfExperience}
          onChange={handleChange}
        />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Years of Experience: {developer.yearOfExperience} <br />
        language: {developer.language} <br />
        Availability:{' '}
        {developer.availability ? "Nope, He's busy!" : 'Available for work!'}
      </p>
      <hr />
      <h5>Mouse Position</h5>
      <p>
        x: {mousePosition.x}, y: {mousePosition.y}
      </p>
      <hr />

      <h5>Github Accounts</h5>
      <p>
        <input
          ref={inputUsernameRef}
          type='text'
          name='username'
          placeholder='Search username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button type='button' onClick={fetchUser}>
          Search
        </button>
        <button type='button' onClick={handleclearInput}>
          Clear
        </button>
      </p>
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.name} /> <br />
          Name: {user.name} <br />
          bio: {user.bio} <br />
        </div>
      )}
    </div>
  );
}

export default ExampleApp5;
