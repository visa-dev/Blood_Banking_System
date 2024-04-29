import React, { useState } from "react";
import { Link, json } from "react-router-dom"; // Assuming you're using React Router for navigation

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

import { navLinks } from '../assets/data/HeaderData';
import { socialLinks, contactData } from '../assets/data/FooterData';
import { axiosGet, axiosPost } from "../AxiosOperations";
import Profile from "../pages/Donar/Profile";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");




  const handleLogin = (e) => {
    e.preventDefault();

    // Perform validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Clear form fields and errors after successful login
    setEmail("");
    setPassword("");
    setError("");
  };

  const userLogin = async () => {

    try {
      if (email && password) {
        await axiosPost('donor/login', { email: email, password: password })
          .then((data) => {

            if ([data.data][0].success === true &&[data.data][0].role=== 'donor' ) {
              navigate(`/profile?id=${encodeURIComponent([data.data][0].id)}`);
            } else if([data.data][0].success === true &&[data.data][0].role=== 'admin' ) {
              navigate(`/admin/profile?id=${encodeURIComponent([data.data][0].id)}`);
            }else{
              alert([data.data][0].message);
            }
          }



          )
      } else {
        alert("You must enter all feilds");
      }

    } catch (error) {
      alert(error.response.data.message);
    }


  }

  return (
    <div>
      <div>
        <Header navLinks={navLinks} />
      </div>
      <div className="min-h-screen flex pt-[100px] justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              LOGIN
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="m-[10px]">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="m-[10px]">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <div className="m-[10px]">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={userLogin}
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-900">
              Forgot your password?
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link></p>
          </div>
        </div>
      </div>

      <div>
        <Footer navLinks1={socialLinks} navLinks2={contactData} />
      </div>
    </div>
  );
};

export default Login;
