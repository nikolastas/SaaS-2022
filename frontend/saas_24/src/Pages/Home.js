import React from 'react'
import {useState, useEffect} from 'react'

const Home = () => {

    let [msg, setMsg] = useState(<h1>Loading</h1>);
    let token = sessionStorage.getItem('authentication');

    const login = () => {
        window.location.href = "/login";
    }
    useEffect(() => {
        if (token === undefined || token === null) {
            sessionStorage.removeItem("authentication")
            setMsg(
                <>
                    <h1>You are on this page by mistake please log in</h1>
                    <button id="butt" onClick={login}>Login</button>
                </>
            )

        } else {
            let options = {
                method: "post",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'authentication': token
                }
            }


            fetch("http://localhost:6660/check", options).then(r => {
                if (!r.ok) {
                    sessionStorage.removeItem("authentication")
                    setMsg(
                        <>
                            <h1>There was an error with your login credentials. Try Logging in again</h1>
                            <button id="butt" onClick={login}>Login</button>
                        </>
                    )

                } else {
                    setMsg(
                        <div className='center'>
                            <p style={{textAlign: 'center', fontSize: '17px'}}>Welcome to mama!!</p>
                        </div>
                    )
                }
            })
        }
    }, [token])

    return (
        <>
            {msg}
        </>
    )

}

export default Home;