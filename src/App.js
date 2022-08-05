import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
// import Quiz from './component/Quiz';
// import SplashScreen from './component/SplashScreen';
// import Apps from './component/Register';

import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'

 

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )

  // const [facet, setFacet] = useState('isSplashScreen');

  // const setNextFacet = value =>{setFacet(value)}
  
  // return (
  //   <div className="App">
  //     {facet === 'isSplashScreen' && <SplashScreen nextFacet = {setNextFacet}  />}
  //     {facet === 'isRegister' && <Apps nextFacet = {setNextFacet} />}
  //     {facet === 'isQuiz' && <Quiz nextFacet = {setNextFacet} />}
  //   </div>
  // );
}

export default App;
