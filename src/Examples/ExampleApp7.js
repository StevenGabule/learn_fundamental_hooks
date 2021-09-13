import React, {useRef, useState, useEffect} from "react";

const baseURL = 'https://api.github.com/users'

function ExampleApp7() {
  const [developer, setDeveloper] = useState({
    name: "",
    age: "",
    yearOfExp: "",
    language: "PHP",
    availability: false,
  })

  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [username, setUsername] = useState('stevengabule');
  const [user, setUser] = useState(null);
  const inputUsernameRef = useRef(null);

  function handleClickChangeLanguage() {
    setDeveloper(prev => ({...prev, language: 'JavaScript'}))
  }

  function handleClickJobStatus() {
    setDeveloper(prev => ({...prev, availability: !prev.availability}))
  }

  function handleChangeInput({target}) {
    const {name, value} = target;
    setDeveloper(prev => ({...prev, [name]: value}))
  }

  useEffect(() => {
    document.title = developer.name;
  }, [developer.name]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
    }
  }, [])

  function handleMousePosition({pageX: x, pageY: y}) {
    setMousePosition({x, y})
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchUser() {
    const res = await fetch(`${baseURL}/${username}`)
    const data = await res.json();
    setUser(data)
  }

  function handleClearInput() {
    setUsername('');
    setUser(null);
    inputUsernameRef.current.value = '';
    inputUsernameRef.current.focus()
  }

  return (
    <>
      <p>
        <button onClick={handleClickChangeLanguage}>Change Programming Language</button>
        <button onClick={handleClickJobStatus}>Change Job Status</button>
      </p>
      <p>
        <input type={'text'} name={'name'} placeholder={'Name'} onChange={handleChangeInput}/>
        <input type={'number'} name={'age'} placeholder={'Age'} onChange={handleChangeInput}/>
        <input type={'number'} name={'yearOfExp'} placeholder={'Year of experience'} onChange={handleChangeInput}/>
      </p>
      <h4>Person bio</h4>
      <p>
        Name: {developer.name}<br/>
        Age: {developer.age}<br/>
        Programming language:{developer.language} <br/>
        Year of Experience: {developer.yearOfExp}<br/>
        Availability: {developer.availability ? 'Yes' : 'No'}<br/>
      </p>
      <hr/>
      <h4>Mouse Position</h4>
      <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
      <hr/>
      <h4>Github Repo</h4>
      <p>
        <input ref={inputUsernameRef}
               type={'text'}
               name={'username'}
               onChange={({target}) => setUsername(target.value)}
               value={username}/>
        <button onClick={fetchUser}>Search</button>
        <button onClick={handleClearInput}>Clear</button>
      </p>
      {user && (
        <p>
          <img src={user.avatar_url} alt={user.name} width={'50'} /> <br />
          Name: {user.name} <br />
          Biography: {user.bio} <br />
        </p>
      )}
    </>
  )
}

export default ExampleApp7


