import React, { useEffect, useRef, useState } from 'react';

const baseURL = 'https://api.github.com/users';

function ExampleApp2() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: 0,
    yearsOfExp: 0,
    language: 'PHP',
    isEmployed: false,
  });

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('stevengabule');
  const inputRef = useRef();

  function handleClickJobEmployment(e) {
    setDeveloper((prev) => ({
      ...prev,
      isEmployed: !prev.isEmployed,
    }));
  }

  function handleClickChangeLanguage(e) {
    setDeveloper((prev) => ({
      ...prev,
      language: 'JavaScript',
    }));
  }

  function handleChangeInput({ target }) {
    const { name, value } = target;
    setDeveloper((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMovePosition);
    return () => {
      document.removeEventListener('mousemove', handleMovePosition);
    };
  }, []);

  function handleMovePosition({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await fetch(`${baseURL}/${username}`);
    const data = await response.json();
    setUser(data);
  }

  function handleClickClear() {
    inputRef.current.value = '';
    inputRef.current.focus();
    setUsername('');
  }

  return (
    <div>
      <p>
        <button type='button' onClick={handleClickJobEmployment}>
          Change Job Employment
        </button>
        <button type='button' onClick={handleClickChangeLanguage}>
          Change Langauge
        </button>
      </p>
      <p>
        <input
          type='text'
          onChange={handleChangeInput}
          name='name'
          placeholder='Enter name'
        />
        <input
          type='number'
          onChange={handleChangeInput}
          name='age'
          placeholder='Enter age'
        />
        <input
          type='number'
          onChange={handleChangeInput}
          name='yearsOfExp'
          placeholder='Enter year of employment'
        />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        language: {developer.language} <br />
        Years of Employment: {developer.yearsOfExp}
        <br />
        Is Employed: {developer.isEmployed ? 'Employed' : 'Unemployed'} <br />
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
          ref={inputRef}
          placeholder='Enter username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type='button' onClick={getUser}>
          Search
        </button>
        <button type='button' onClick={handleClickClear}>
          Clear
        </button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} /> <br />
          Name: {user.name} <br />
          Bio: {user.bio} <br />
        </p>
      )}
    </div>
  );
}

export default ExampleApp2;
