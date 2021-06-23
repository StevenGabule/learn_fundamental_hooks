import React, { useEffect, useRef, useState } from "react";

const baseURL = "https://api.github.com/users";

function App() {
  const [developer, setDeveloper] = useState({
    name: "",
    yearExperience: 0,
    language: "python",
    isEmployed: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [username, setUsername] = useState("stevengabule");
  const [user, setUser] = useState(null);
  const inputRef = useRef();

  function handleChangeInput({ target }) {
    const { name, value } = target;
    setDeveloper({
      ...developer,
      [name]: value,
    });
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  function handleToggleEmployment() {
    setDeveloper((prevState) => ({
      ...prevState,
      isEmployed: !prevState.isEmployed,
    }));
  }

  function handleChangeLanguage() {
    setDeveloper((prevState) => ({
      ...prevState,
      language: "JavaScript",
      yearExperience: 0,
    }));
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  });

  function handleMouseMove({ pageX, pageY }) {
    setMousePosition({ x: pageX, y: pageY });
  }

  async function getUser() {
    const response = await fetch(`${baseURL}/${username}`);
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []);

  function handleClearInput() {
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <div>
      <p>
        <button type="button" onClick={handleToggleEmployment}>
          Toggle Employment
        </button>
        <button type="button" onClick={handleChangeLanguage}>
          Change langauge
        </button>
      </p>
      <p>
        <input
          name="name"
          type="text"
          placeholder="Enter name"
          onChange={handleChangeInput}
        />
        <input
          name="yearExperience"
          type="number"
          value={developer.yearExperience}
          onChange={handleChangeInput}
          placeholder="Number of experience"
        />
      </p>
      <p>My name: {developer.name}</p>
      <p>I'm learning: {developer.language}</p>
      <p>Years of experience: {developer.yearExperience}</p>
      <p>Is employed: {developer.isEmployed ? "Employed" : "Unemployed"}</p>

      <hr />
      <h3>Mouse Position</h3>
      <p>
        x: {mousePosition.x}, y:{mousePosition.y}
      </p>

      <hr />
      <h3>Github Profile</h3>
      <p>
        <input
          type="text"
          ref={inputRef}
          onChange={({ target }) => setUsername(target.value)}
        />
        <button type="button" onClick={getUser}>
          Search
        </button>
        <button type="button" onClick={handleClearInput}>
          Clear
        </button>
      </p>
      {user ? (
        <>
          <img
            src={user.avatar_url}
            alt={user.name}
            style={{ width: 50, height: 50 }}
          />
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default App;
