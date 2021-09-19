import React from 'react'
const baseUrl = 'https://api.github.com/users'
function App() {
  const [developer, setDeveloper] = React.useState({
    name: '',
    age: '',
    language: 'PHP',
    yearOfExp: 0,
    available: false,
  });

  const [mousePosition, setMousePosition] = React.useState({x:0, y:0});
  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState(null);
  const usernameRef = React.useRef(null);

  function onChange(e) {
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
  },[])

  function handleMousePosition({pageX: x, pageY: y}) {
    setMousePosition({x,y})
  }

  async function fetchUser() {
    const res = await fetch(`${baseUrl}/${username}`)
    const data = await res.json()
    setUser(data)
  }

  React.useEffect(() => {
    fetchUser()
  }, [])

  function clearInput() {
    usernameRef.current.value = '';
    usernameRef.current.focus();
    setUsername('')
    setUser(null)
  }

  return (
    <div>
      <p>
        <button onClick={() => setDeveloper(prev => ({...prev, language: 'JavaScript'}))}>Change language</button>
        <button onClick={() => setDeveloper(prev => ({...prev, available: !prev.available}))}>Change Status</button>
      </p>
      <p>
        <input type="text" placeholder={'Enter name'} onChange={onChange} name={'name'} value={developer.name}/>
        <input type="number" placeholder={'Enter age'} onChange={onChange} name={'age'} value={developer.age}/>
        <input type="number" placeholder={'number of exp'} onChange={onChange} name={'yearOfExp'} value={developer.yearOfExp}/>
      </p>
      <p>
        Name: {developer.name} <br />
        Age: {developer.age} <br />
        Programming: {developer.language} <br />
        Year of experience: {developer.yearOfExp} <br />
        Availability: {developer.available ? 'Yes' : 'No'} <br />
      </p>
      <h2>Mouse Position</h2>
      <p>x: {mousePosition.x}, y: {mousePosition.y}</p>
      <h2>Github Accounts</h2>
      <p>
        <input type="text"
               placeholder={'Search a username'}
               name={'username'}
               value={username}
               ref={usernameRef}
               onChange={e => setUsername(e.target.value)}/>
        <button onClick={fetchUser}>Search</button>
        <button onClick={clearInput}>Clear</button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} width={50}/> <br/>
          Name: {user.name} <br/>
          Bio: {user.bio} <br/>
        </p>
      )}
    </div>
  )
}

export default App;
