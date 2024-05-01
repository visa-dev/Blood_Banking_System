import React from 'react'
import { useLocation } from "react-router-dom";
import { axiosGet, axiosPost } from '../../AxiosOperations';
import { useState,useEffect } from 'react';
import Spinner1 from '../../pages/spinners/Spinner1';
import testImg from '/user.png';

const SearchDonor = () => {
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requesterData = searchParams.get("data");
  var decodedFormData = JSON.parse(requesterData);

  useEffect(() => {

    getDonorsList().then(setInterval(() => {
      setLoading(false);
    }, 500))


    return () => {
      // Cleanup code goes here
    };
  }, []);

  const getDonorsList = async () => {

  
      try {
        const data = await axiosGet(`donor/finddonor/${decodedFormData.bloodgroup}/${decodedFormData.province}/${decodedFormData.district}`);
        setDonorList(data.data);
       

      } catch (error) {
        console.error('Error fetching donor list:', error);
      }
    
  };

  return (
    <div><center className='text-[30px]'>Donors</center>
    
    <div>
    {donorList.length !== 0 ? (
        loading ? (<Spinner1 />) : (<div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4'>
          {donorList.map(item => (
            <div className='flex justify-center p-[20px]' key={item._id}>
              <div className='xl:w-[500px] lg:w-[500px] md:w-[500px] h-[300px] border-2 bg-slate-200  '>
                <div className='flex justify-around  '>
                  <div className='w-[200px] h-[200px]  mt-[20px]  '><span><img src={testImg} alt="" /></span></div>
                  <div className='w-[200px] h-[200px] mt-[40px]  ' >
                    <div>
                      <span key='1' className='cardData text-[24px] font-bold'>{item.fullname}</span>
                      <i className="fa-solid fa-phone"></i><span key='2' className='cardData'>{item.mobile}</span>
                      <i className="fa-solid fa-location-dot"></i><span key='3' className='cardData'>{item.district} , {item.province}.</span>
                      <i className="fa-regular fa-calendar"></i><span key='5' className='cardData'>Last Donation : {item.lastdonationdate}</span>
                    </div>
                  </div>
                </div>

                

              </div>
            </div>
          ))}
        </div>)

      ) : (
        <div className='flex justify-center w-full/2 h-[500px] items-center bg-slate-200 m-[20px] homepara'>No Available Donor/Not Select All Fields</div>
      )}
    </div>
    </div>
  
  )
}

export default SearchDonor

