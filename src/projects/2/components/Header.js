import React from "react";

function Header({user, setUser}) {
  return (
    <div>
      <h3>Welcome {user}! <button onClick={() => setUser('')}>Logout</button></h3>
    </div>
  )
}

export default Header;
