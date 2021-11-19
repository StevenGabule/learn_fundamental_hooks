function Header({ user, setUser }) {
  return (
    <div>
      <p>Hello, {user}</p>
      <button type="button" onClick={() => setUser('')}>
        Logout
      </button>
    </div>
  );
}

export default Header;
