import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import UserLogin from './pages/UserLogin';
import Signup from './pages/Signup';
import Findid from './pages/Findid'
import Findpw from './pages/Findpw'
import Menubar from './components/Menubar';
import MenuBar2 from './components/Menubar2';
import MenuBar3 from './components/Menubar3';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/find-id" element={<MenuBar2 />} />
      <Route path="/find-pw" element={<MenuBar3 />} />
    </Routes>
    </Router>
  );
}

export default App;
