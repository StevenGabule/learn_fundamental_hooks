import React from "react";

function Login({setUser}) {
  const [username, setUsername] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setUser(username)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h2>Please Login</h2>
      <input type="text" onChange={e => setUsername(e.target.value)}/>
      <button type={'submit'}>Login</button>
      </form>
    </div>
  )
}

export default Login;
