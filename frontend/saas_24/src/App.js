import * as ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
// import {useEffect} from "react";
// import Footer from './Components/Footer'
// import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
// import Logout from './Pages/Logout';
import Statistics from './Pages/Statistics';

function App() {

    return (
        <BrowserRouter>
            <div className='App'>
                {/*<Header />*/}
            </div>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/statistics" element={<Statistics/>}/>
            </Routes>
            {/*<Footer/>*/}
        </BrowserRouter>
    );
}

export default App;
