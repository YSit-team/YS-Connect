import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './pages/Teacher/AdminHome'
import UserHome from './pages/Student/UserHome'
import UserLogin from './pages/Account/Login';
import Signup from './pages/Account/Signup';
import Findid from './pages/Account/Findid';
import Findpw from './pages/Account/Findpw';
import Rental from './pages/Equipment/Rental';
import ListDetail from './pages/Teacher/ListDetail'
import RentalList from './pages/Teacher/RentalList'
import Test from './pages/Test'
import AddCamera from './pages/Equipment/AddCamera'
import Notlogin from './pages/Notlogin'
import RentalStatus from './pages/Equipment/RentalStatus'
import Community from './pages/Community/Community'
import CommunityDetail from './pages/Community/CommunityDetail'
import CommunityWrite from './pages/Community/CommunityWrite'
import RentalRoom_S from './pages/SoundProofBooth/RentalRoom_S'
import RentalRoom_T from './pages/SoundProofBooth/RentalRoom_T'
import RoomDetail from './pages/SoundProofBooth/RoomDetail'


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/home" element={<UserHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/sign-up" element={<Signup />} />
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
      <Route path="/Room_S" element={<RentalRoom_S />} />
      <Route path="/Room_T" element={<RentalRoom_T />} />
      <Route path="/roomdetail/:id" element={<RoomDetail/>} />
    </Routes>
    </Router>
  );
}

export default App;