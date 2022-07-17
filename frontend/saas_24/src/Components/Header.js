import { useState,useEffect } from "react";

const Header = () => {

    let token = sessionStorage.getItem('authentication');
    const [mail, setMail] = useState("")
    const [hid,setHid] = useState(true)

    const options = {
        method: "post",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'authentication': token
        }
    }


    const handleLogout = ()=>{
        if(token === undefined || token === null){

        }
        else{
            fetch("https://login-dsgmlwmwqa-ew.a.run.app/logout",options).then(r => {
                if(r.ok){
                    sessionStorage.removeItem('authentication')
                    window.location.href = "/login"
                }
            })
        }
    }


    useEffect(() => {
        return () => {
            if(token){
                setHid(false)
            }
            else{
                setHid(true)
            }
            if(token && window.location.pathname !== "/postlogin"){
                fetch("https://login-dsgmlwmwqa-ew.a.run.app/home",options).then(r => r.json())
                    .then(d => {
                        setMail(d.email);
                    });
            }
        }}, [])


    return (
        <>
            <div className="header">
                <h1>Energy Live 2022</h1>
                <h3 hidden={hid}>{mail}</h3>
                <button onClick={handleLogout} hidden={hid}>Logout</button>
                <button onClick={()=>window.location.href="/home"} hidden={hid}>Statistics</button>
            </div>
        </>
    )
}

export default Header;