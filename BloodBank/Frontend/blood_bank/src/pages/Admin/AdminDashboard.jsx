import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import { axiosGet } from '../../AxiosOperations';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { adminNavLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



const AdminDashboard = () => {


  

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    useEffect(() => {

        axiosGet(`donor/byid/${id}`)

          
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

                <Header navLinks={adminNavLinks} donorloged={true} />
            </div>
            <div className='flex justify-center gap-4 p-[20px] bg-gray-800'>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-10 '>

                    {
                        adminNavLinks.map((item) =>
                            <Stack direction="col" spacing={2}>
                                {
                                    <Button className='w-[250px] h-[50px]' variant="outlined" component={Link} to={item.path} >{item.display}</Button>
                                }

                            </Stack>
                        )

                    }





                </div>
            </div>

            <div>
                <h1 className='flex w-full items-center justify-center h-[500px]'>I Need To Devlope</h1>
            </div>

            {/* <div className='flex justify-center items-center text-[28px] font-bold w-full h-[500px] bg-slate-300'>

        <div>
          <span className='cardData text-[26px]' > {profile.fullname}</span>

          <span className='cardData text-[26px]'>{profile.mobile}</span>
          <span className='cardData text-[26px]'>{profile.district}  {profile.province}</span>
          <span className='cardData text-[26px]'>{profile.lastdonationdate}</span>
          <span className='cardData text-[26px]'>{profile.bloodgroup}</span>
        </div>

      </div>
       */}
            <div>
                <Footer navLinks1={socialLinks} navLinks2={contactData} />
            </div>
        </div>
    )
}

export default AdminDashboard