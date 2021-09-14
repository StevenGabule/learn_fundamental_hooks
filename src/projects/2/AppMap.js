import React, {useState} from "react";

const baseURl = 'https://api.github.com/users'

function AppMap() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    yearOfExp: '',
    language: 'PHP',
    available: false,
  });

  const usernameRef = React.useRef(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('stevengabule');
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

  function handleClickChangeLanguage() {
    setDeveloper(prev => ({...prev, language: 'JavaScript'}));
  }

  function handleClickChangeAvailability() {
    setDeveloper(prev => ({...prev, available: !prev.available}));
  }

  function handleChangeDeveloper(e) {
    const {name, value} = e.target;
    setDeveloper(prev => ({...prev, [name]: value}));
  }

  React.useEffect(() => {
    document.title = developer.name
  }, [developer.name])

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition)
    return () => {
      window.removeEventListener('mousemove', handleMousePosition)
    }
  }, [])

  function handleMousePosition({pageX: x, pageY: y}) {
    setMousePosition({x, y})
  }

  React.useEffect(() => {
    fetchUser().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchUser() {
    const res = await fetch(`${baseURl}/${username}`)
    const data = await res.json();
    setUser(data)
  }

  function clearFocus() {
    usernameRef.current.value = '';
    setUser(null)
    setUsername('')
  }

  return (
    <div>
      <p>
        <button onClick={handleClickChangeLanguage}>Change Language</button>
        <button onClick={handleClickChangeAvailability}>Change Availability</button>
      </p>
      <p>
        <input onChange={handleChangeDeveloper} type="text" name={'name'} placeholder={'enter name'}
               value={developer.name}/>
        <input onChange={handleChangeDeveloper} type="number" name={'age'} placeholder={'enter age'}
               value={developer.age}/>
        <input onChange={handleChangeDeveloper} type="number" name={'yearOfExp'} placeholder={'enter of experience'}
               value={developer.yearOfExp}/>
      </p>
      <h4>Web Developer</h4>
      <p>
        Name: {developer.name} <br/>
        Age: {developer.age} <br/>
        Programming Language: {developer.language} <br/>
        Year of experience: {developer.yearOfExp} <br/>
        Availability: {developer.available ? 'Yes' : 'Nope'} <br/>
      </p>
      <hr/>
      <h4>Mouse Position</h4>
      <p>
        x: {mousePosition.x}, y: {mousePosition.y}
      </p>
      <h4>Github repo</h4>
      <p>
        <input type="text" ref={usernameRef} onChange={(e) => setUsername(e.target.value)} value={username}/>
        <button onClick={fetchUser}>Search</button>
        <button onClick={clearFocus}>Clear</button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} /> <br/>
          Name: {user.name} <br/>
          Bio: {user.bio} <br/>
        </p>
      )}
    </div>
  )
}

export default AppMap;
