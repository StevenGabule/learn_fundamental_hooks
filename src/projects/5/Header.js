import React from 'react'

function Header({user, setUser}) {
  return (
    <div>
      <h1>Welcome {user}! <button onClick={() => setUser('')}>Logout</button></h1>
    </div>
  )
}

export default Header;
