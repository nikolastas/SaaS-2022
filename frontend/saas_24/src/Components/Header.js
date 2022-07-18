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

    const link1 = "input-atl-b4jugd4qqq-ew.a.run.app/"
    const link2 = "input-agrt-jco5wuvaqq-ew.a.run.app/"
    const link3 = "input-ff-dsgmlwmwqa-ew.a.run.app/"

    const apiCall = (link, name, reset) => {

        fetch("https://" + link + (reset ? "reset" : "get_data"), o).then((r) => {
            if (r.ok) console.log("API CALL FOR " + name + (reset ? " RESET" : "") + " OK"); else console.log("API CALL FAILED")
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
            if (token !== undefined) {
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

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }


    return (
        <>
            <nav className="topnav">
                <a>
                    <button className="button" > Energy Live 2022</button>
                </a>
                {token ? <><a>
                    <button className="button button2" onClick={handleLogout} hidden={hid}>Logout</button>
                </a>
                    <a>
                        <button className="button button2" onClick={() => window.location.href = "/home"}
                                hidden={hid}>Statistics
                        </button>
                    </a>
                    {window.location.pathname !== "/postlogin"?<a>
                        <button className="button button2" hidden={hid}>{mail} </button>
                    </a>:null}
                    <a>
                        <div className="dropdown" hidden={hid}>
                            <button className="dropbtn" onClick={myFunction}>API CALLS
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={"dropdown-content"} id="myDropdown" className="dropdown-content"
                                 hidden={hid}>
                                <p className={"selected-dropdown"}
                                   onClick={() => apiCall(link1, "ATL", false)}>API CALL ATL</p>
                                <p className={"selected-dropdown"}
                                   onClick={() => apiCall(link2, "AGRT", false)}>API CALL AGRT</p>
                                <p className={"selected-dropdown"}
                                   onClick={() => apiCall(link3, "FF", false)}>API CALL FF</p>
                                <p className={"selected-dropdown"}
                                   onClick={() => apiCall(link1, "ATL", true)}>API CALL RESET ATL</p>
                                <p className={"selected-dropdown"}
                                   onClick={() => apiCall(link2, "AGRT", true)}>API CALL RESET AGRT</p>
                                <p className={"selected-dropdown"}
                                   onClick={() => apiCall(link3, "FF", true)}>API CALL RESET FF</p>
                            </div>
                        </div>

                    </a></> : null}


            </nav>
        </>
    )
}

export default Header;