import React, { useEffect, useRef, useState } from "react";

const baseUrl = "https://api.github.com/users/";

function App() {
  const [developer, setDeveloper] = useState({
    name: "",
    language: "PYTHON",
    yearsExperiened: 0,
    isEmployed: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [username, setUsername] = useState("stevengabule");
  const [user, setUser] = useState(null);
  const inputRef = useRef();

  function handleToggleEmployment() {
    setDeveloper((prevDeveloper) => ({
      ...prevDeveloper,
      isEmployed: !prevDeveloper.isEmployed,
    }));
  }

  function handleClickLanguage() {
    setDeveloper({
      ...developer,
      language: "JAVASCRIPT",
      yearsExperiened: 0,
    });
  }

  function handleChangeInput(e) {
    setDeveloper({
      ...developer,
      yearsExperiened: e.target.value,
    });
  }

  function handleChangeName(e) {
    setDeveloper({
      ...developer,
      name: e.target.value,
    });
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMousePosition);
  }, [developer.name]);

  useEffect(() => {
    getUser();
  }, []);

  function handleMousePosition({ pageX, pageY }) {
    setMousePosition({ x: pageX, y: pageY });
  }

  async function getUser() {
    const response = await fetch(`${baseUrl}${username}`);
    const data = await response.json();
    setUser(data);
  }

  function handleClearInput() {
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <div>
      <button onClick={handleToggleEmployment}>Toggle Employment Status</button>
      <p>
        <button onClick={handleClickLanguage}>Change Language</button>
      </p>

      <input
        type={"text"}
        placeholder={"Name"}
        onChange={handleChangeName}
        name="name"
      />

      <input
        type={"number"}
        placeholder={"Years"}
        onChange={handleChangeInput}
      />

      <p>Name: {developer.name}</p>
      <p>I am learning: {developer.language}</p>

      <p>Years of experience: {developer.yearsExperiened}</p>

      <p>
        Employment Status: {developer.isEmployed ? "Employed" : "Unemployed"}
      </p>
      <h3>Mouse Position:</h3>
      <p>
        X: {mousePosition.x}, Y: {mousePosition.y}
      </p>
      <hr />
      <h2>Working on API</h2>
      <p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          ref={inputRef}
          placeholder={"Input username"}
        />
        <button type={"button"} onClick={getUser}>
          Search
        </button>
        <button type={"button"} onClick={handleClearInput}>
          Clear
        </button>
      </p>
      <p>
        <img src={user.avatar_url} style={{ width: 100 }} alt={user.name} />
      </p>
      <p>name: {user.name}</p>
      <p>bio: {user.bio}</p>
    </div>
  );
}

export default App;
