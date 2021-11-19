const { useState } = require('react');

function Login({ setUser }) {
  const [username, setUsername] = useState('');

  function handleLogin() {
    setUser(username);
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
