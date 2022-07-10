import React from "react"
import { Link } from "react-router-dom"

// const Auth = ()=>{
//     const auth = sessionStorage.getItem('auth');
//     const usr = sessionStorage.getItem('username');
//     if(auth == 'true'){
//         return (
//         <>
//             <div className="dropdown">
//                 <div className="dropbtn">
//                 <Link to="/logout" className="fa fa-caret-down" style={{textDecoration : 'none' ,color:"white"}}>Logout</Link>
//                 </div>
        
//             </div>
//                 <h2 style={{color:"white"}}>Welcome, {usr}</h2>
//         </>);
//     }
//     return <div className="dropdown">
//         <div className="dropbtn">
//             <Link to="/login" className="fa fa-caret-down" style={{textDecoration : 'none' ,color:"white"}}>Login</Link>
//         </div>
//     </div>;
// }

// const Dropdown = ()=>{
//     return (
//         <div className="dropdown">
//             <button className="dropbtn">Queries
//                 <i className="fa fa-caret-down"></i>
//             </button>
//             <div className="dropdown-content">
//                 <Link to="/queries/payments">Payments</Link>
//                 <Link to="/queries/statistics">Statistics</Link>
//             </div>
//         </div>        
//     )
// }

const Header = () => {
    //const auth = sessionStorage.getItem('auth');
    return (
        <>
            <div className="nav">
                <h1 style = {{color: "white", font:"cascadia"}}>PassPantou</h1>
            </div>
            {/* <nav className="nav">
                <div className="dropdown">
                    <div className="dropbtn">
                        <Link to="/home" className="fa fa-caret-down" style={{textDecoration : 'none' ,color:"white"}}>Start Page</Link>
                    </div>
                </div>
                <Dropdown/> 
                <Auth/>
            </nav>             */}
        </>
    )
}


export default Header;