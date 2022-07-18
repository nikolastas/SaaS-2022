import React from 'react'
import {useState, useEffect} from 'react';

const RenewUser = () => {


    let [msg, setMsg] = useState(<h1>Loading...</h1>);
    let token = sessionStorage.getItem('authentication');
    console.log(token)
    const login = () => {
        window.location.href = "/login";
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    useEffect(() => {
        const handlesub = () => {
            const val = document.getElementById("select").value;
            console.log(val)
            const options = {
                method: "post",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'authentication': token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'sublength': val,
                    'subscription': '1'
                })
            }

            fetch("https://login-dsgmlwmwqa-ew.a.run.app/subscription/UpdateSub", options)
                .then(r => {
                    if (!r.ok) {

                        sessionStorage.removeItem('authentication')
                        // setMsg(
                        //         <h1>User Creation failed please try to log in again</h1>
                        // )
                        sleep(2000).then(() => {
                            window.location.href = "/renewuser";
                        })
                    } else {
                        setMsg(
                            <>
                                <h1 align={"center"}>Subscription renewed Successfully</h1>
                                <p align={"center"}>Redirecting to Home</p>
                            </>
                        )
                        sleep(2000).then(() => {
                            window.location.href = "/home"
                        })
                    }
                })
                .catch((e) => {
                    console.log(e)
                    setMsg(
                        <h1 align={"center"}>User Creation failed please try to log in again</h1>
                    )
                    window.location.href = "/renewuser";
                })
        }

        if (!token) {
            sessionStorage.removeItem("authentication")
            setMsg(
                <>
                    <h1 align={"center"}>You are in this page by mistake</h1>;
                </>
            )
            sleep(2000).then(() => {
                login()
            })
        } else {
            setMsg(
                <>
                    <h1 align={"center"}>Choose a subscription plan below</h1>
                    <div align={"center"}>
                        <ul >
                            <li>
                                <select id="select" className={"button3 butto"}>
                                    <option name="1" value={1}>1 month</option>
                                    <option name="2" value={2}>6 months</option>
                                    <option name="3" value={3}>1 year</option>
                                </select>
                            </li>
                            <li>
                                <button id="submit" className={"button3 butto "} onClick={handlesub}>Subscribe and Renew
                                    subscription
                                </button>
                            </li>

                        </ul>


                    </div>

                </>
            )
        }

    }, [])

    return (
        <>
            {msg}
        </>
    )
}

export default RenewUser;