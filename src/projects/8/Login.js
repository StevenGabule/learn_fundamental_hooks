import { useState } from 'react';

function Login({ setUser }) {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setUser(username);
  }

  return (
    <div>
      <h3>Please Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter username'
        />
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}

export default Login;
