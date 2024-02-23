import React from "react";
import { NavLink, Link } from 'react-router-dom';


const Footer = (props) => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-[50px]">

      <div className="flex justify-evenly mb-[20px]">

        <div  >
          <span className="font-bold text-[20px]">Follow Us</span>
          {
            props.navLinks1.map((link, index) =>

              <li style={{ listStyleType: 'none' }} className="mt-[10px] homepara" key={index} >

                <NavLink to={link.path} >{link.icon}</NavLink>

              </li>
            )
          }
        </div>
        <div>
          <span className="font-bold text-[20px]">Contact Us</span>
          {
            props.navLinks2.map((link, index) =>
              <li style={{ listStyleType: 'none' }} className="mt-[3px] homepara" key={index} >

                <span>{link.display}</span>

              </li>
            )
          }

        </div>

      </div>
      <div >
        <hr />
        <center>Copyright @ 2023 All Rights Reserved 2024</center>
        <center>Designed & Developed by <span className="text-purple-700">Visa-Dev</span></center>
      </div>



    </footer>
  );
};

export default Footer;
