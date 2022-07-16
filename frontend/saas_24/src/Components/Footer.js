import { useState,useEffect } from "react";

const Footer = () => {
    
    let token = sessionStorage.getItem('authentication');
    const [msg, setMsg] = useState(<p></p>)
    const [hid,setHid] = useState(true)

    const options = {
        method: "post",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'authentication': token
        }
    }

    const days = (date_1, date_2) =>{
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    const handleLogout = ()=>{
        if(token === undefined || token === null){
            
        }
        else{
            fetch("http://localhost:6660/logout",options).then(r => {
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
            fetch("http://localhost:6660/subscription/EndSub",options).then(r => r.json())
            .then(d => {
                const dat = new Date();
                const dat2 = new Date(d.SubscriptionEndTime)
                const diff = days(dat2,dat)
                if(diff<0){
                    setMsg(<p>Subscription Plan Ended</p>)
                }
                else{
                    setMsg(<p>Days left {diff}</p>)
                }
            });
        }
    }}, [token])


    return (
        <>
            <div className="footer">
                <p>a project by group SAAS21-24®</p>
                {msg}
                <button onClick={handleLogout} hidden={hid}>Logout</button>
            </div>
        </>
        )
}

export default Footer;