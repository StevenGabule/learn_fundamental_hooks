function Header({ user, setUser }) {
  return (
    <div>
      <h2>
        Welcome {user}! <button onClick={() => setUser('')}>Logout</button>
      </h2>
    </div>
  );
}

export default Header;
