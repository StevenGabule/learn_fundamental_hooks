import React from "react";
const baseURL = 'https://api.github.com/users'

function AppMap() {
  const [developer, setDeveloper] = React.useState({
    name: '',
    age: '',
    yearOfExp: '',
    language: 'PHP',
    availability: false
  });
  const [user, setUser] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const usernameRef = React.useRef(null);
  const [mousePosition, setMousePosition] = React.useState({x:0, y: 0});

  function handleChangeDeveloper(e) {
    const {name, value} = e.target;
    setDeveloper(prev => ({...prev, [name]: value}))
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

  React.useEffect(() => {
    fetchUser();
  }, []);

  function handleMousePosition({pageX: x, pageY: y}) {
    setMousePosition({x,y})
  }

  async function fetchUser() {
    const res = await fetch(`${baseURL}/${username}`)
    const data = await res.json();
    setUser(data)
  }

  function clearData() {
    setUsername('')
    setUser(null)
    usernameRef.current.value = ''
    usernameRef.current.focus();
  }

  return (
    <div>
      <p>
        <button onClick={() => setDeveloper(prev => ({ ...prev, language: 'Javascript'}))}>
          Change language
        </button>
        <button onClick={() => setDeveloper(prev => ({ ...prev, availability: !prev.availability}))}>
          Change availability
        </button>
      </p>
      <p>
        <input type="text"
               name={'name'}
               onChange={handleChangeDeveloper}
               value={developer.name}
               placeholder={'Enter a name'}/>

        <input type="number"
               name={'age'}
               onChange={handleChangeDeveloper}
               value={developer.age}
               placeholder={'Enter a age'}/>

        <input type="number"
               name={'yearOfExp'}
               onChange={handleChangeDeveloper}
               value={developer.yearOfExp}
               placeholder={'Number of experience'}/>
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Year of experience: {developer.yearOfExp} <br />
        Language: {developer.language} <br />
        Availability: {developer.availability ? 'Yes' : 'NOpe'}
      </p>
      <hr/>
      <h2>Mouse Position</h2>
      <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
      <hr/>
      <h2>Search Github Profile</h2>
      <p>
        <input type="text"
               name={'username'}
               ref={usernameRef}
               onChange={e => setUsername(e.target.value)}
               value={username}/>
        <button onClick={fetchUser}>Search</button>
        <button onClick={clearData}>Clear</button>
      </p>
      {user && (
        <p>
          <img width={50} src={user.avatar_url} alt={user.name}/> <br/>
          Name: {user.name} <br/>
          Bio: {user.bio}
        </p>
      )}
    </div>
  )
}

export default AppMap;
