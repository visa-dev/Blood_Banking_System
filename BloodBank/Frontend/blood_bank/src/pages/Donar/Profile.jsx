import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import { axiosGet } from '../../AxiosOperations';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { donorNavLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';


const Profile = () => {


  const [profile, setProfile] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {

    axiosGet(`donor/byid/${id}`)

      .then(data => {

        setProfile(data.data);

      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });


    return () => {
      // Cleanup code goes here
    };
  }, []);



  return (
    <div >
      <div>
        <Header navLinks={donorNavLinks} />
      </div>
      <div className='flex justify-center text-[28px] font-bold'>
        {profile.fullname}
      </div>
      <div>
        <Footer navLinks1={socialLinks} navLinks2={contactData} />
      </div>
    </div>
  )
}

export default Profile