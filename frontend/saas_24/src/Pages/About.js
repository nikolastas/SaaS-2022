import React from 'react'
import {useState, useEffect} from 'react'

const About = () => {

    let [msg, setMsg] = useState(<h1>Loading</h1>);
    let token = sessionStorage.getItem('authentication');
    console.log(token);

    const login = () => {
        window.location.href = "/login";
    }
    useEffect(() => {
        if (token === undefined || token === null) {
            sessionStorage.removeItem("authentication")
            setMsg(
                <>
                    <h1 className='center'>You are on this page by mistake please log in</h1>
                    <button id="butt" className={"button button"} onClick={login}>Login</button>
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
            fetch("https://login-dsgmlwmwqa-ew.a.run.app/check", options)
                .then(r => {
                    if (!r.ok) {
                        sessionStorage.removeItem("authentication")
                        setMsg(
                            <>

                                <h1 align={"center"}>There was an error with your login credentials. Try Logging in
                                    again</h1>
                                <button align={"center"} className={"button3 butto"} onClick={login}>Login</button>


                            </>
                        )

                    } else {
                        setMsg(
                            <div className='center'>
                                <p className={"p1"} style={{textAlign: 'center', fontSize: '17px'}}>The goal of the
                                    project was to
                                    develop an cloud-based application using the
                                    microservice architecture. The apps hosts data about the energy consumption of
                                    countries in Europe and presents
                                    them in a way users can interact with them. In order to access the app, users must
                                    have a google account a pick
                                    their desired subscription plan.</p>
                            </div>
                        )
                    }
                })
                .catch((e) => {
                    console.log(e.status)
                })
        }
    }, [token])

    return (
        <>
            <div align={"center"}>
                {msg}
            </div>
        </>
    )

}

export default About;