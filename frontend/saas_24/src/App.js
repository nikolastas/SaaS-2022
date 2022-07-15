import * as ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
// import {useEffect} from "react";
// import Footer from './Components/Footer'
// import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Postlogin from './Pages/Postlogin';
import NewUser from "./Pages/NewUser";
import RenewSubscription from "./Pages/NewUser";
// import Logout from './Pages/Logout';
import Statistics from './Pages/Statistics';
import RenewUser from "./Pages/RenewUser";

function App() {

    return (
        <BrowserRouter>
            <div className='App'>
                {/*<Header />*/}
            </div>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/postlogin" element={<Postlogin/>}/>
                <Route path="/newuser" element={<NewUser/>}/>
                <Route path="/renewuser" element={<RenewUser/>}/>
                <Route path="/renewsub" element={<RenewSubscription/>}/>
                <Route path="/statistics" element={<Statistics/>}/>
            </Routes>
            {/*<Footer/>*/}
        </BrowserRouter>
    );
}

export default App;
