import {useState, useEffect} from "react";

const Header = () => {

    let token = sessionStorage.getItem('authentication');
    const [mail, setMail] = useState("")
    const [hid, setHid] = useState(true)

    const options = {
        method: "post",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'authentication': token
        }
    }


    const o = {
        method: 'get',
        connection: 'keep-alive',
        credentials: "same-origin"
    }

    const link1 = "input-atl-b4jugd4qqq-ew.a.run.app/get_data"
    const link2 = "input-agrt-jco5wuvaqq-ew.a.run.app/get_data"
    const link3 = "input-ff-dsgmlwmwqa-ew.a.run.app/get_data"

    const apiCallATL = () => {

        fetch("https://" + link1, o).then((r) => {
            if (r.ok) {
                console.log("API CALL FOR ATL OK");
            } else console.log(r.status)
        })
    }

    const apiCallAGRT = () => {

        fetch("https://" + link2, o).then((r) => {
            console.log(r)
            if (r.ok) console.log("API CALL FOR AGRT OK"); else console.log("API CALL FAILED")
        })
    }

    const apiCallFF = () => {

        fetch("https://" + link3, o).then((r) => {
            console.log("https://" + link3)
            if (r.ok) console.log("API CALL FOR FF OK"); else console.log("API CALL FAILED")
        })
    }


    const handleLogout = () => {
        if (token === undefined || token === null) {

        } else {
            fetch("https://login-dsgmlwmwqa-ew.a.run.app/logout", options).then(r => {
                if (r.ok) {
                    sessionStorage.removeItem('authentication')
                    window.location.href = "/login"
                }
            })
        }
    }


    useEffect(() => {
        return () => {
            if (token) {
                setHid(false)
            } else {
                setHid(true)
            }
            if (token && window.location.pathname !== "/postlogin") {
                fetch("https://login-dsgmlwmwqa-ew.a.run.app/home", options).then(r => r.json())
                    .then(d => {
                        setMail(d.email);
                    });
            }
        }
    }, [])


    return (
        <>
            <div className="wrapper">
                <div className="title">
                    <h1>Energy Live 2022</h1>
                </div>

                <div className="title">
                    <p className="p1" hidden={hid}>{mail}</p>
                </div>
                <div className="title">
                    <button className="button buttoncans" onClick={handleLogout} hidden={hid}>Logout</button>
                </div>

                <div className="title">
                    <button className="button button2" onClick={() => window.location.href = "/home"}
                            hidden={hid}>Statistics
                    </button>
                </div>

                <div className="dropdown" hidden={hid}>
                    <button className="dropbtn" onClick="myFunction()">API CALLS
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className={"dropdown-content"} id="myDropdown" className="dropdown-content">
                        <p className="fa fa-caret-down" style={{textDecoration : 'none' ,color:"black"}} onClick={apiCallATL}>API CALL ATL</p>
                        <p className="fa fa-caret-down" style={{textDecoration : 'none' ,color:"black"}} onClick={apiCallAGRT}>API CALL AGRT</p>
                        <p className="fa fa-caret-down" style={{textDecoration : 'none' ,color:"black"}} onClick={apiCallFF}>API CALL FF</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;