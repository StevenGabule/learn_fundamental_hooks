import React, { useEffect, useRef, useState } from 'react';

function ExampleApp3() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: 0,
    language: 'PHP',
    yearOfExp: 0,
    isEmployed: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef();
  const [username, setUsername] = useState('stevengabule');
  const [user, setUser] = useState(null);

  function handleClickChangeLanguage() {
    setDeveloper((prev) => ({
      ...prev,
      language: 'JavaScript',
    }));
  }

  function handleClickChangeEmployment() {
    setDeveloper((prev) => ({
      ...prev,
      isEmployed: !prev.isEmployed,
      yearOfExp: 0,
    }));
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // change title
  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  // change mouse position
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function handleMouseMove({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  async function fetchUser() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickClear() {
    inputRef.current.value = '';
    inputRef.current.focus();
    setUsername('');
  }

  return (
    <div>
      <p>
        <button type='button' onClick={handleClickChangeLanguage}>
          Change Language
        </button>
        <button type='button' onClick={handleClickChangeEmployment}>
          Change Employment
        </button>
      </p>
      <p>
        <input
          onChange={handleChangeInput}
          type='text'
          name='name'
          placeholder='Enter name'
        />
        <input
          onChange={handleChangeInput}
          type='number'
          name='age'
          placeholder='Enter age'
        />
        <input
          type='number'
          onChange={handleChangeInput}
          name='yearOfExp'
          placeholder='Year of experience'
        />
      </p>
      <p>
        Name: {developer.name}
        <br />
        Age: {developer.age}
        <br />
        Years of experience: {developer.yearOfExp}
        <br />
        Programmer Language: {developer.language}
        <br />
        Is Employed: {developer.isEmployed ? 'Employed' : 'Unemployed'}
        <br />
      </p>
      <hr />
      <h3>Mouse Position</h3>
      <p>
        x: {mousePosition.x}, y: {mousePosition.y}
      </p>

      <hr />
      <h3>Github Profile</h3>
      <p>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={inputRef}
          placeholder='Enter username'
        />
        <button type='button' onClick={fetchUser}>
          Search
        </button>
        <button type='button' onClick={handleClickClear}>
          Clear
        </button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} style={{ width: 50 }} />{' '}
          <br />
          Name: {user.name}
          <br />
          Bio: {user.bio}
          <br />
        </p>
      )}
    </div>
  );
}

export default ExampleApp3;
