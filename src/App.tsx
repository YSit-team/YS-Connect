import React, {useState} from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './api/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './pages/Teacher/AdminHome'
import UserHome from './pages/Student/UserHome'
import UserLogin from './pages/Account/Login';
import Findid from './pages/Account/Findid';
import Findpw from './pages/Account/Findpw';
import Rental from './pages/Equipment/Rental';
import ListDetail from './pages/Teacher/ListDetail'
import RentalList from './pages/Teacher/RentalList'
import Test from './pages/검색기능테스트'
import AddCamera from './pages/Equipment/AddCamera'
import Notlogin from './pages/Notlogin'
import RentalStatus from './pages/Equipment/RentalStatus'
import Community from './pages/Community/Community'
import CommunityDetail from './pages/Community/CommunityDetail'
import CommunityWrite from './pages/Community/CommunityWrite'
import RentalRoom_S from './pages/Booth/RentalRoom_S'
import RentalRoom_T from './pages/Booth/RentalRoom_T'
import RoomDetail from './pages/Booth/RoomDetail'
import Profile from './pages/Account/Profile'
import EditProfile from './pages/Account/EditProfile';
import CommunityEdit from './pages/Community/CommunityEdit';
import GatherForm from "./pages/Account/Signup/GatherForm"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
    <Routes>
      <Route path="/home" element={<UserHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/find-id" element={<Findid />} />
      <Route path="/find-pw" element={<Findpw />} />
      <Route path="/rental" element={<Rental />} />
      <Route path="/listdetail/:id" element={<ListDetail/>} />
      <Route path="/rentallist" element={<RentalList/>} />
      <Route path="/test" element={<Test />} />
      <Route path="/add-camera" element={<AddCamera />} />
      <Route path="/" element={<Notlogin />} />
      <Route path="/status" element={<RentalStatus />} />
      <Route path="/community" element={<Community />} />
      <Route path="/communitywrite" element={<CommunityWrite />} />
      <Route path="/CommunityDetail/:id" element={<CommunityDetail/>} />
      <Route path="/CommunityEdit/:id" element={<CommunityEdit/>} />
      <Route path="/Room_S" element={<RentalRoom_S />} />
      <Route path="/Room_T" element={<RentalRoom_T />} />
      <Route path="/roomdetail/:id" element={<RoomDetail/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit" element={<EditProfile />} />
      <Route path="/signup-form" element={<GatherForm/>} />
      
    </Routes>
    </Router>
  );
}

export default App;