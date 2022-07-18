import React, {useState, useEffect} from "react";

const Postlogin = () => {

    let [msg, setMsg] = useState(<h1>Loading...</h1>);
    let token = sessionStorage.getItem('authentication');
    console.log(token)
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

            const options = {
                method: "post",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'authentication': token
                }
            }

            fetch("https://login-dsgmlwmwqa-ew.a.run.app/home", options)
                .then(r => r.json())
                .then(data => {
                    sessionStorage.setItem("authentication", token)
                    if (parseInt(data.subscription) === -1) {
                        setMsg(
                            <>
                                <div align={"center"}>
                                    <h1 align={"center"} id="UserArea">Hello {data.name}</h1>
                                    <h2 align={"center"} id="Info">You need to create a new account to continue</h2>
                                    <button id="newUser" align="center" className={"button3 butto "} onClick={() => {
                                        window.location.href = "/newuser";
                                    }}>New User
                                    </button>
                                </div>
                            </>
                        )

                    } else if (parseInt(data.subscription) === 0) {
                        setMsg(
                            <>
                                <div align={"center"}>
                                    <h1 align={"center"} id="UserArea">Hello {data.name}</h1>
                                    <h2 align={"center"}>You need to renew your subscription to continue</h2>
                                    <button id="renewUser" className={"button3 butto "} onClick={() => {
                                        window.location.href = "/renewuser";
                                    }}>Renew Subscription
                                    </button>
                                </div>s
                            </>
                        )

                    } else if (parseInt(data.subscription) === 1) {
                        window.location.href = "/home";
                    } else {
                        setMsg(
                            <>
                                <h1 align={"center"}>There was an unexpected error</h1>
                            </>
                        )
                    }
                })
        }
    }, [])

    return (
        <>
            {msg}
        </>
    )
}

export default Postlogin