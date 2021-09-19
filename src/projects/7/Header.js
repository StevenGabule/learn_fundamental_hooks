function Header({user, setUser}) {
  return (
    <div>
      <h1>Welcome {user}! <button onClick={() => setUser('')}>logout</button></h1>
    </div>
  )
}

export default Header;
