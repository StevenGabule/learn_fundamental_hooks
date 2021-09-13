import React, { useEffect, useRef, useState } from "react";

const baseURL = "https://api.github.com/users";

function App() {
  const [developer, setDeveloper] = useState({
    name: "",
    yearsExp: 0,
    language: "Python",
    isEmployed: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("stevengabule");
  const inputRef = useRef();

  function handleToggleEmploymentClick() {
    setDeveloper((prevDev) => ({
      ...prevDev,
      isEmployed: !prevDev.isEmployed,
    }));
  }

  function handleChangeLanguageClick() {
    setDeveloper((prevDev) => ({
      ...prevDev,
      language: "JavaScript",
      yearsExp: 0,
    }));
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    setDeveloper((prevDev) => ({
      ...prevDev,
      [name]: value,
    }));
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMousePosition);
    return () => {
      window.removeEventListener("mousemove", handleMousePosition);
    };
  }, []);

  function handleMousePosition({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  async function getUser() {
    const response = await fetch(`${baseURL}/${username}`);
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []);

  function clearInputClick() {
    inputRef.current.value = "";
    inputRef.current.focus();
    setUsername("");
  }

  return (
    <div>
      <p>
        <button type="button" onClick={handleToggleEmploymentClick}>
          Toggle Employment
        </button>
        <button type="button" onClick={handleChangeLanguageClick}>
          Change Language
        </button>
      </p>

      <p>
        <input
          type="text"
          onChange={handleInputChange}
          name="name"
          placeholder="Enter name"
        />
        <input
          type="number"
          onChange={handleInputChange}
          name="yearsExp"
          placeholder="Number of years"
        />
      </p>
      <p>Name: {developer.name}</p>
      <p>Language: {developer.language}</p>
      <p>Years of experience: {developer.yearsExp}</p>
      <p>Employed: {developer.isEmployed ? "Employed" : "Unemployed"}</p>
      <hr />
      <h3>Mouse position</h3>
      <p>
        x: {mousePosition.x}, y: {mousePosition.y}
      </p>

      <hr />
      <h3>Github Position</h3>
      <p>
        <input
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          ref={inputRef}
          placeholder="Search username"
          value={username}
        />
        <button type="button" onClick={getUser}>
          Search
        </button>
        <button type="button" onClick={clearInputClick}>
          Clear
        </button>
      </p>
      {user ? (
        <>
          <p>
            <img
              src={user.avatar_url}
              alt={user.name}
              style={{ width: 50, height: 50 }}
            />
          </p>
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
        </>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default App;
