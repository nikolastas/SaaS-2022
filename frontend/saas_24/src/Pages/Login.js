import React from 'react'
import {useEffect} from "react";

// const google = window.google;

const Login = () => {

    const handleLogin = (response) => {

        const token = response.credential;

        const options = {
            method: "post",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'authentication': token
            },
        }

        fetch("http://localhost:6660/home", options).then((data) => console.log(data));

        document.getElementById("signInDiv").hidden = true;

    }

    useEffect(() => {
        /*global google*/
        //TODO make this safer
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

    const handleSignOut = (event) => {
        console.log(event)
        document.getElementById("signInDiv").hidden = false;
        ;
    }

    return (
        <div className="App">
            <div id="signInDiv"></div>
            <button onClick={(e) => {
                handleSignOut(e)
            }}>SignOut
            </button>
        </div>
    )
}

export default Login