import React, { useState } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setUser(username);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={"Input username"}
          onChange={({ target }) => setUsername(target.value)}
        />
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
}

export default Login;
