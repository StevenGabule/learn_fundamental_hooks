import React from "react";

function Login ({setUser}) {
  const [username, setUsername] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault()
    setUser(username)
  }

  return <form onSubmit={handleSubmit}>
    <h1>Please login</h1>
    <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder={'Enter a username'}/>
    <button type={'submit'}>Login</button>
  </form>
}

export default Login;
