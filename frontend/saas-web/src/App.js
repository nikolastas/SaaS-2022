import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer'
import Header from './Components/Header';
// import Home from './Pages/Home';
import Login from './Pages/Login';
// import Logout from './Pages/Logout';
// import Payments from './Pages/Payments';
// import Statistics from './Pages/Statistics';



function App() {
  return (
    <>
      {/* <div className='App'>
        <Header />
      </div> */}
      <Routes>
        {/* <Route exact path = "/home" element = {<Home/>}/> */}
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
