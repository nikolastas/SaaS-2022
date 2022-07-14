import React from 'react'

const Home = () => {

    let token = sessionStorage.getItem('authentication');

    const login = ()=>{
        window.location.href = "/login";
    }

    if(token===undefined || token===null){
        sessionStorage.removeItem("authentication")
        return(
            <>
                <h1>You are on this page by mistake please log in</h1>
                <button id="butt" onClick={login}>Login</button>;
            </>
        )

    }
    else{
        const options = {
            method: "post",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'authentication': 'dasdaddsadasdasdasd'
            }
        }

        fetch("http://localhost:6660/check", options).then(r=>{
            if(!r.ok){
                sessionStorage.removeItem("authentication")
             return (
                 <>
                     <h1>There was an error with your login credentials. Try Logging in again</h1>
                     <button id="butt" onClick={login}>Login</button>
                 </>
             )
            }
            else{
                return (
                    <div className='center'>
                        <p style={{textAlign: 'center', fontSize: '17px'}}>Ο σκοπός του λογισμικού είναι η διαχείριση ενός
                            συστήματος διαλειτουργικότητας τον διοδίων. Με τα δεδομένα, που του παρέχουν οι λειτουργοί των διοδίων,
                            το λογισμικό θα εξασφαλίζει τον δίκαιο διαμοιρασμό των χρημάτων που αφορούν τις διελεύσεις των κατόχων
                            e-pass μεταξύ των λειτουργών. </p>
                    </div>
                )
            }
        })
    }


}

export default Home