import {useEffect, useRef, useState} from "react";

const baseURL = 'https://api.github.com/users'

function App() {
  const [developer, setDeveloper] = useState({
    name: '',
    age: '',
    yearOfExp: '',
    language: 'PHP/Laravel',
    available: false
  });
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const inputRef = useRef(null);

  function handleInput(e) {
    const {name, value} = e.target;
    setDeveloper({...developer, [name]: value})
  }

  function handleMousePosition({pageX: x, pageY: y}) {
    setMousePosition({x, y})
  }

  function clearInput() {
    inputRef.current.value = '';
    inputRef.current.focus()
    setUser(null)
  }

  useEffect(() => {
    document.title = developer.name
  }, [developer.name]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition)
    return () => {
      window.removeEventListener('mousemove', handleMousePosition)
    }
  }, [])

  function handleChangeLanguage() {
    setDeveloper({...developer, language: 'ReactJS/Javascript'})
  }

  function handleChangeAvailable() {
    setDeveloper({...developer, available: !developer.available})
  }

  async function fetchUser() {
    const data = await (await fetch(`${baseURL}/${username}`)).json()
    setUser(data)
  }

  useEffect(() => {
    fetchUser()
  }, []);

  return (
    <div>
      <p>
        <button onClick={handleChangeLanguage}>Change Language</button>
        <button onClick={handleChangeAvailable}>Change Available</button>
      </p>
      <p>
        <input type="text" name={'name'} onChange={handleInput} value={developer.name} placeholder={'Enter name'}/>
        <input type="number" name={'age'} onChange={handleInput} value={developer.age} placeholder={'Enter age'}/>
        <input type="number" name={'yearOfExp'} onChange={handleInput} value={developer.yearOfExp}
               placeholder={'Number of exp'}/>
      </p>
      <p>
        Name: {developer.name} <br/>
        Age: {developer.age} <br/>
        Year of experience: {developer.yearOfExp} <br/>
        Programmer language: {developer.language} <br/>
        Available: {developer.available ? 'Nope' : 'Yup!'} <br/>
      </p>
      <p>
        Mouse position x: {mousePosition.x}, y: {mousePosition.y}
      </p>
      <p>
        <input type="text"
               name={'username'}
               onChange={e => setUsername(e.target.value)}
               value={username}/>
        <button onClick={fetchUser}>Search</button>
        <button onClick={clearInput}>Clear</button>
      </p>
      {user && (
        <div>
          <p><img src={user.avatar_url} alt={user.name}/></p>
          <p>
            Name: {user.name} <br/>
            Bio: {user.bio} <br/>
          </p>
        </div>
      )}
    </div>
  )
}

export default App;
