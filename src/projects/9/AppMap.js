import React, {useState} from "react";
const baseURI = 'https://api.github.com/users'

function AppMap() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    language: 'Laravel',
    yearOfExp: '',
    availability: '',
  });
  const [user, setUser] = useState(null);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [username, setUsername] = useState('');
  const usernameRef = React.useRef(null);

  React.useEffect(() => {
    document.title = developer.name
  }, [developer.name]);

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
    fetchUsers();
  }, [])

  async function fetchUsers() {
    const user = await (await fetch(`${baseURI}/${username}`)).json()
    setUser(user)
  }

  function handleChangeLanguage() {
    setDeveloper(prev => ({...prev, language: 'ReactJS'}))
  }

  function handleChangeJob() {
    setDeveloper(prev => ({...prev, available: !prev.available}))
  }

  function handleChangeDeveloper(e) {
    const {name, value} = e.target;
    setDeveloper(prev => ({...prev, [name]: value}))
  }

  function handleClearInput(e) {
    usernameRef.current.value = ''
    usernameRef.current.focus()
    setUser(null)
  }

  return (
    <div>
      <p>
        <button onClick={handleChangeLanguage}>Change Language</button>
        <button onClick={handleChangeJob}>Change Job Status</button>
      </p>
      <p>
        <input type="text" value={developer.name} name={'name'} onChange={handleChangeDeveloper}/>
        <input type="text" value={developer.age} name={'age'} onChange={handleChangeDeveloper}/>
        <input type="text" value={developer.yearOfExp} name={'yearOfExp'} onChange={handleChangeDeveloper}/>
      </p>
      <p>
        Name: {developer.name} <br/>
        Age: {developer.age} <br/>
        Language: {developer.language} <br/>
        Year of experience: {developer.yearOfExp} <br/>
        Status: {developer.available ? 'Yes' : 'No'} <br/>
      </p>
      <h2>Mouse Position</h2>
      <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
      <h2>Github</h2>
      <p>
        <input type="text" value={username} name={'username'} onChange={e => setUsername(e.target.value)} ref={usernameRef}/>
        <button onClick={fetchUsers}>Search</button>
        <button onClick={handleClearInput}>Clear</button>
      </p>
      {user && (
        <div>
          <p>
            <img src={user.avatar_url} alt={user.name}/> <br/>
            Name: {user.name} <br/>
            Biography: {user.bio}
          </p>
        </div>
      )}
    </div>
  )
}
export default AppMap;
