
import './app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Finder/Home";
import About from "./pages/Finder/About";
import Contact from "./pages/Finder/Contact";
import News from "./pages/Finder/News";
import Register from "./auth/Register";
import Login from "./auth/Login";
import RequestBlood from './pages/Finder/RequestBlood';
import FindDonor from './pages/Finder/FindDonor';
import Profile from './pages/Donar/Profile';

import Requests from './pages/Donar/Requests';
import Notifications from './pages/Donar/Notifications';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Donor from './pages/Admin/Donor';
import BloodBank from './pages/Admin/BloodBank';
import AllRequests from './pages/Admin/AllRequests';
import OtpSend from './auth/OtpSend';
import OtpReceive from './auth/OtpReceive';

function App() {


  return (
    <BrowserRouter>
      <Routes>



        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/register/otpsend' element={<OtpSend />}></Route>
        <Route path='/register/otpreceive' element={<OtpReceive />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/requestblood' element={<RequestBlood />}></Route>
        <Route path='/finddonor' element={<FindDonor />}></Route>
        <Route path='/profile' element={<Profile />}></Route>



        <Route path='/donor/requests' element={<Requests />}></Route>
        <Route path='/donor/notifications' element={<Notifications />}></Route>

        <Route path='/admin/login' element={<AdminDashboard />}></Route>
        <Route path='/admin/donors' element={<Donor />}></Route>
        <Route path='/admin/bloodbank' element={<BloodBank />}></Route>
        <Route path='/admin/requests' element={<AllRequests />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
