import * as ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import Footer from './Components/Footer'
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Postlogin from './Pages/Postlogin';
import NewUser from "./Pages/NewUser";
import RenewSubscription from "./Pages/NewUser";
import Statistics from './Pages/Statistics';
import RenewUser from "./Pages/RenewUser";
import HighchartTest from "./Pages/HighChartPresentation"

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/postlogin" element={<Postlogin/>}/>
                <Route path="/newuser" element={<NewUser/>}/>
                <Route path="/renewuser" element={<RenewUser/>}/>
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="/hc" element={<HighchartTest/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
