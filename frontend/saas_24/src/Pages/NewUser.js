import React from 'react'

const NewUser = () => {

    let token = sessionStorage.getItem('authentication');
    let but
    let msg
    let msg2
    let sub
    let sel

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const login = () =>{
        window.location.href = "/login";
    }

    const handlesub = (e)=>{
        const val = sel.value;
        const options = {
            method: "post",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'authentication': token
            },
            body : {
                'sublength' : val
            }
        }

        fetch("http://localhost:6660/subscription/NewSub", options).then(r=>{
            if(!r.ok){
                msg = <h1>User Creation failed please try to log in again</h1>
                but = <button id="butt">Login</button>;
                sessionStorage.removeItem('authentication')
            }
            else{
                msg = <h1>User Creation Successfully</h1>
                msg2 = <p>Redirecting to Home</p>
                sleep(3000).then(()=>{
                    window.location.href="/home"
                })
            }
        })
    }

    if(token===undefined || token===null){
        msg = <h1>You are in this page by mistake</h1>;
        sessionStorage.removeItem("authentication")
        but = <button id="butt" onClick={login}>Login</button>;
    }
    else{

        msg = <h1>Choose a subscription plan below</h1>
        sub = <button id = "subbut" onClick={handlesub}>Subscribe and Create User</button>;
        sel = <select id="select">
                <option name="1" value={1}>1 month</option>
                <option name="2" value={2}>3 months</option>
                <option name="3" value={3}>1 month</option>
            </select>;

    }




    return (
        <div>
            {msg}
            {msg2}
            {sel}
            {but}
            {sub}
        </div>
    )

}

export default NewUser;