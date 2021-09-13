import React, { useEffect, useRef, useState } from "react";

const baseURL = "https://api.github.com/users";

export default function ExampleApp() {
  const [developer, setDeveloper] = useState({
    name: "",
    age: 0,
    yearsOfExp: 0,
    language: "PHP",
    isEmployed: false,
  });

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [username, setUsername] = useState("stevengabule");
  const [user, setUser] = useState(null);
  const clearRef = useRef();

  function handleClickToggleJobStatus() {
    setDeveloper((prev) => ({ ...prev, isEmployed: !prev.isEmployed }));
  }

  function handleClickChangeLanguage() {
    setDeveloper((prev) => ({ ...prev, language: "JS", yearsOfExp: 0 }));
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
    document.addEventListener("mousemove", handleMousePosition);
    return () => {
      document.removeEventListener("mousemove", handleMousePosition);
    };
  }, []);

  function handleMousePosition({ pageX: x, pageY: y }) {
    setMousePosition({ x, y });
  }

  useEffect(() => {
    getRepoUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getRepoUser() {
    const response = await fetch(`${baseURL}/${username}`);
    const data = await response.json();
    setUser(data);
  }

  function handleClearUsername() {
    clearRef.current.value = "";
    clearRef.current.focus();
    setUsername("");
  }

  return (
    <div>
      <p>
        <button onClick={handleClickToggleJobStatus}>Toggle Job Status</button>
        <button onClick={handleClickChangeLanguage}>Change Language</button>
      </p>
      <p>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChangeDeveloper}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChangeDeveloper}
        />

        <input
          type="number"
          name="yearsOfExp"
          placeholder="Years of experience"
          onChange={handleChangeDeveloper}
        />
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        language: {developer.language} <br />
        Years of exp: {developer.yearsOfExp}
        <br />
        Job Status: {developer.isEmployed ? "Employed" : "Unemployed"}
      </p>

      <hr />

      <h3>Mouse position</h3>
      <p>
        x: {mousePosition.x} y: {mousePosition.y}
      </p>

      <hr />

      <h3>Github Users</h3>
      <p>
        <input
          type="text"
          ref={clearRef}
          name="username"
          placeholder="Enter username"
          value={username}
        />
        <button type="button" onClick={getRepoUser}>
          Search
        </button>
        <button type="button" onClick={handleClearUsername}>
          Clear
        </button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} style={{ width: 50 }} alt={user.name} />{" "}
          <br />
          Name: {user.name} <br />
          Bio: {user.bio} <br />
        </p>
      )}
    </div>
  );
}
