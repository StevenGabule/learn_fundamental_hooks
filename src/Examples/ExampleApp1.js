import React, { useEffect, useRef, useState } from 'react';

const INITIAL_VALUE = {
  name: '',
  age: 0,
  yearsOfExperience: 0,
  language: 'PHP',
  isEmployed: false,
};

const baseURL = 'https://api.github.com/users';

function ExampleApp1() {
  const [developer, setDeveloper] = useState(INITIAL_VALUE);
  const [username, setUsername] = useState('stevengabule');
  const inputRef = useRef();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [user, setUser] = useState(null);

  function handleClickToggleChangeStatus() {
    setDeveloper((prev) => ({
      ...prev,
      isEmployed: !prev.isEmployed,
    }));
  }

  function handleClickChangeLanguage() {
    setDeveloper((prev) => ({
      language: 'JavaScript',
      yearsOfExperience: 0,
    }));
  }

  function handleChangeDeveloper(e) {
    const { name, value } = e.target;
    setDeveloper((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMovePosition);
    return () => {
      window.removeEventListener('mousemove', handleMouseMovePosition);
    };
  }, [developer.name]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await fetch(`${baseURL}/${username}`);
    const data = await response.json();
    setUser(data);
  }

  function handleMouseMovePosition({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  function cleanInput() {
    inputRef.current.value = '';
    inputRef.current.focus();
    setUsername('');
    setUser(null);
  }

  return (
    <div>
      <p>
        <button type='button' onClick={handleClickToggleChangeStatus}>
          Toggle Change Status
        </button>
        <button type='button' onClick={handleClickChangeLanguage}>
          Change Language
        </button>
      </p>
      <p>
        <input
          type='text'
          name='name'
          placeholder='Enter name'
          onChange={handleChangeDeveloper}
        />
        <input
          type='text'
          name='age'
          placeholder='Enter age'
          onChange={handleChangeDeveloper}
        />
        <input
          type='number'
          name='yearsOfExperience'
          placeholder='Number of experience'
          onChange={handleChangeDeveloper}
        />
      </p>
      <h3>Personal Information</h3>
      <p>
        My name: {developer.name} <br />
        Age: {developer.age} <br />
        Language: {developer.language} <br />
        Years of experience: {developer.yearsOfExperience} <br />
        Is employed: {developer.isEmployed ? 'Employed' : 'Unemployed'} <br />
      </p>
      <hr />
      <h3>Mouse Position</h3>
      <p>
        x: {mousePosition.x}, y: {mousePosition.y}
      </p>
      <h3>Github Profile</h3>
      <p>
        <input
          type='text'
          name='username'
          value={username}
          ref={inputRef}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter username'
        />
        <button type='button' onClick={getUser}>
          Search
        </button>
        <button type='button' onClick={cleanInput}>
          Clear
        </button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} width='50' alt={user.name} /> <br />
          Name: {user.name} <br />
          Bio: {user.bio} <br />
        </p>
      )}
    </div>
  );
}

export default ExampleApp1;
