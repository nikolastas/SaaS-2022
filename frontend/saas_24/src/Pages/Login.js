import React from 'react'
import {useEffect} from "react";

// const google = window.google;

const Login = () => {

    const handleLogin = (response) => {

        const token = response.credential;
        //console.log(token)

        const options = {
            method: "post",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'authentication': token
            },
        }

        fetch("http://localhost:6660/home", options).then(r => r.json())
            .then(data => {
                sessionStorage.setItem("authentication",token);
                if(parseInt(data.subscription)===-1){
                    document.getElementById("UserArea").innerHTML = "Hello "+data.name;
                    document.getElementById("Info").innerHTML = "You need to create a new user to continue";
                    document.getElementById("newUser").hidden = false;
                }
                else if(parseInt(data.subscription)===0){
                    document.getElementById("UserArea").innerHTML = "Hello "+data.name;
                    document.getElementById("Info").innerHTML = "You need to renew your subscription to continue";
                    document.getElementById("renew").hidden = false;
                }
                else if(parseInt(data.subscription)===1){

                    window.location.href = "/home";
                }
                else{
                    document.getElementById("UserArea").innerHTML = "Hello "+data.name;
                    document.getElementById("Info").innerHTML = "You need to refresh the page because an unexpected error is occured";
                }
            });

        document.getElementById("signInDiv").hidden = true;

    }

    useEffect(() => {
        /* global google */
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
            <h1 id="UserArea"></h1>
            <h2 id="Info"></h2>
            <div id="signInDiv"></div>
            <button onClick={(e) => {
                handleSignOut(e)
            }}>SignOut
            </button>
            <button id = "renew" hidden="true">Renew Subscription</button>
            <button id = "newUser" hidden="true" onClick={()=>{
                window.location.href = "/newuser";
            }}>New User</button>
        </div>
    )
}

export default Login