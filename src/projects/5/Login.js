import React from 'react'

function Login({setUser}) {
  const [username, setUsername] = React.useState('');

  function handleLogin(e) {
    e.preventDefault();
    setUser(username)
  }

  return (<div>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      <button type="submit">Login</button>
    </form>
  </div>)
}

export default Login;
