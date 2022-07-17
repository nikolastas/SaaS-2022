import React from 'react'
import {useEffect} from "react";

const Login = () => {
    sessionStorage.removeItem('authentication')
    // const sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }

    const handleLogin = (response) => {


        const token = response.credential;
        console.log(token)

        sessionStorage.setItem('authentication',token);
        window.location.href = "/postlogin"
        document.getElementById("signInDiv").hidden = true;

    }

    useEffect(() => {
        /* global google */
        //TODO make this safer

        if(window.google === undefined) window.location.reload()

        google.accounts.id.initialize({
            client_id: "427817892641-7pif8nq9bmqt36sbpo9a8hdnq7l93qgj.apps.googleusercontent.com",
            callback: handleLogin,
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline",
                size: "large"
            }
        )
    }, []);

    // const handleSignOut = (event) => {
    //     console.log(event)
    //     document.getElementById("signInDiv").hidden = false;
    //     ;
    // }

    return (
        <div className="App">
            <h1 id="UserArea"></h1>
            <h2 id="Info"></h2>
            <div id="signInDiv"></div>
            {/* {<button onClick={(e) => {
                handleSignOut(e)
            }}>SignOut
            </button>} */}
            {/*{msg}*/}
        </div>
    )
}

export default Login