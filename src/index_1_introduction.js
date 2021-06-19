import React, {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'


const baseURL = 'https://api.github.com/users/';

function App() {
    const [developer, setDeveloper] = useState({
        name: '',
        developer: 'python',
        yearsExperience: 0,
        isEmployed: false
    })

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('stevengabule');
    const searchInput = useRef();

    async function getUser() {
        const response = await fetch(`${baseURL}${username}`);
        const data = await response.json();
        setUser(data)
    }

    useEffect(() => {
        getUser()
        // fetch(baseURL).then(response => response.json()).then(data => setUser(data))
    }, [])

    function handleClearInput() {
        searchInput.current.value ='';
        searchInput.current.focus();
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    function handleMouseMove({pageX, pageY}) {
        setMousePosition({x: pageX, y: pageY})
    }

    useEffect(() => {
        document.title = developer.name
    }, [developer.name]);

    function handleClickLanguage() {
        setDeveloper({
            developer: 'JS',
            yearsExperience: 0
        })
    }

    function handleChangeInput(e) {
        setDeveloper({
            ...developer,
            yearsExperience: e.target.value
        })
    }

    function handleChangeName(e) {
        setDeveloper({
            ...developer,
            name: e.target.value
        })
    }

    function handleToggleEmployment() {
        setDeveloper(prevState => ({
            ...prevState,
            isEmployed: !prevState.isEmployed
        }))
    }



    return (
        <div>
            <button onClick={handleToggleEmployment}>Toggle Employment Status</button>
            <p>
                <button onClick={handleClickLanguage}>Change Language</button>
            </p>

            <input type={'number'} placeholder={'Years'} onChange={handleChangeInput}/>
            <input type={'text'} placeholder={'Name'} onChange={handleChangeName}/>

            <p>I am learning: {developer.developer}</p>
            <p>Years of experience: {developer.yearsExperience}</p>
            <p>Employment Status: {developer.isEmployed ? 'Employed' : 'Unemployed'}</p>
            <h3>Mouse Position:</h3>
            <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
            <hr/>
            <h2>Working on API</h2>
            <p>
                <input onChange={event => setUsername(event.target.value)}
                       type="text" ref={searchInput}
                       placeholder={'Input username'}/>
                <button type={'button'} onClick={getUser}>Search</button>
                <button type={'button'} onClick={handleClearInput}>Clear</button>
            </p>
            {user ? (
                <>
                    <img src={user.avatar_url} width={50} alt=""/>
                    <p>Name: {user.name}</p>
                    <p>Biography: {user.bio}</p>
                </>) : 'Loading...'}
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));


