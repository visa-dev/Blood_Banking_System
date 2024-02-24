
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
import Donate from './pages/Donar/Donate';
import Requests from './pages/Donar/Requests';
import Notifications from './pages/Donar/Notifications';


function App() {


  return (
    <BrowserRouter>
      <Routes>



        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/requestblood' element={<RequestBlood />}></Route>
        <Route path='/finddonor' element={<FindDonor />}></Route>
        <Route path='/profile' element={<Profile />}></Route>


        <Route path='/donor/donate' element={<Donate />}></Route>
        <Route path='/donor/requests' element={<Requests />}></Route>
        <Route path='/donor/notifications' element={<Notifications />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
