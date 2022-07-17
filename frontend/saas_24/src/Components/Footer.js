import {useEffect, useState} from "react";

const Footer = () => {


    let fetchInterval = 1000; // 2 seconds.


    let token = sessionStorage.getItem('authentication');
    const [msg, setMsg] = useState(<p></p>)
    const [hid, setHid] = useState(true)
    const [stat, setStat] = useState(<p style={{color: "green"}}>Live</p>)

    const options = {
        method: "post",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'authentication': token
        }
    }

    const days = (date_1, date_2) => {
        let difference = date_1.getTime() - date_2.getTime();
        return Math.ceil(difference / (1000 * 3600 * 24));
    }

    const fetch_api = () => {
        fetch("https://login-dsgmlwmwqa-ew.a.run.app/subscription/EndSub", options)
            .then((r) => {
                if (!r.ok) setStat(<p className="p1" style={{color: "red"}}>Down</p>)
                else setStat(
                    <p className="p1"
                        style={{color: "green"}}>Live</p>
                )
                return r
            })
            .then(r => r.json())
            .then(d => {
                const dat = new Date();
                const dat2 = new Date(d.SubscriptionEndTime)
                const diff = days(dat2, dat)
                if (diff < 0) {
                    setMsg(<p className="p1">Subscription Plan Ended</p>)
                } else {
                    setMsg(<p className="p1">Days left {diff}</p>)
                }
            })
            .catch((e) => {
                console.log(e)
                setStat(<p className="p1" style={{color: "red"}}>Down</p>)
            });
    }



    useEffect(() => {
        {
            if (token) {
                setHid(false)
            } else {
                setHid(true)
            }

            setInterval(() => {

                if (token && window.location.pathname !== "/postlogin") {
                    fetch_api()
                }
            }, fetchInterval)
        }
    }, [token])


    return (
        <>
            <div className="footer">
                <div className="title">
                    <h1>A project by group SAAS 21-24®</h1>
                </div>
                <div className="title">
                    {msg}
                </div>
                <div className="title">
                    <div>Service Status: {stat} </div>
                </div>
                <div className="title">
                    <button className='button button2' onClick={() => {
                        window.location.href = "/renewuser"
                    }} hidden={hid}>Extend Plan
                    </button>
                </div>

                <div className="title">
                    <button className='button button2' onClick={() => {
                        window.location.href = "/about"
                    }}>About
                    </button>
                </div>
            </div>
        </>
    )
}

export default Footer;