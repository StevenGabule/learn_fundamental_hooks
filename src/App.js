import React, { useEffect, useReducer, useRef, useState } from "react";

const baseUrl = "https://api.github.com/users";

function App() {
  const [developer, setDeveloper] = useState({
    name: "",
    language: "PHP",
    yearsExperienced: 0,
    isEmployed: false,
  });

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("stevengabule");
  const inputSearchRef = useRef();

  function handleToggleEmploymentClick() {
    setDeveloper((prevDeveloper) => ({
      ...prevDeveloper,
      isEmployed: !prevDeveloper.isEmployed,
    }));
  }

  function handleChangeLanguageClick() {
    setDeveloper((prevDeveloper) => ({
      ...prevDeveloper,
      language: "JavaScript",
      yearsExperienced: 0,
    }));
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    setDeveloper((prevDeveloper) => ({
      ...prevDeveloper,
      [name]: value,
    }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  function handleMousePosition({ pageX, pageY }) {
    setMousePosition({ x: pageX, y: pageY });
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMousePosition);
    return () => {
      document.removeEventListener("mousemove,", handleMousePosition);
    };
  }, []);

  async function getUser() {
    const response = await fetch(`${baseUrl}/${username}`);
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []);

  function handleClickClear() {
    inputSearchRef.current.value = "";
    inputSearchRef.current.focus();
    setUser(null);
  }

  return (
    <div>
      <p>
        <button onClick={handleToggleEmploymentClick}>Toggle Employment</button>
        <button onClick={handleChangeLanguageClick}>Change Language</button>
      </p>

      <p>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="yearsExperienced"
          placeholder="Number of experienced"
          onChange={handleInputChange}
        />
      </p>

      <h4>Developer Today</h4>
      <p>I am {developer.name}</p>
      <p>I am Learning {developer.language}</p>
      <p>Years of experienced: {developer.yearsExperienced}</p>
      <p>Is employed: {developer.isEmployed ? "Employed" : "Unemployed"}</p>

      <hr />
      <h4>Mouse Position</h4>
      <p>
        x: {mousePosition.x}, y: {mousePosition.y}
      </p>

      <hr />
      <h4>Github Profile</h4>
      <p>
        <input
          type="text"
          placeholder="Enter username"
          ref={inputSearchRef}
          onChange={({ target }) => setUsername(target.value)}
        />
        <button type="button" onClick={getUser}>
          Search
        </button>
        <button type="button" onClick={handleClickClear}>
          Clear
        </button>
      </p>
      {user ? (
        <>
          <img src={user.avatar_url} alt={user.name} style={{ width: 50 }} />
          <p>Name: {user.name}</p>
          <p>Biography: {user.bio}</p>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
