import React from "react";

function Login({setUser}) {
  const [username, setUsername] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setUser(username)
  }

  return (
    <div>
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
               placeholder={'Enter username'}
               onChange={({target}) => setUsername(target.value)}/>
        <button type={'submit'}>Login</button>
      </form>
    </div>
  )
}

export default Login;
