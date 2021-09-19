import React from 'react'

function Login({setUser}) {
  const [username, setUsername] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setUser(username)
  }

  return (
    <div>
      <h1>Please login</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder={'Enter a name'}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
