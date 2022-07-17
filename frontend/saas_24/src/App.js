import * as ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import Footer from './Components/Footer'
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Postlogin from './Pages/Postlogin';
import NewUser from "./Pages/NewUser";
import RenewUser from "./Pages/RenewUser";
import HighchartTest from "./Pages/HighChartPresentation"
import About from "./Pages/About";

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
                <Route path="/hc" element={<HighchartTest/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<Login/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
