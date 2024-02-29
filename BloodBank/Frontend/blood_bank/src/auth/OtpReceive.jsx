import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { axiosPost } from '../AxiosOperations';

const OtpReceive = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const formdata = searchParams.get("formdata");

  const [otp, setOtp] = useState('');
  var decodedFormData = JSON.parse(formdata);

  const getOtp = (e) => {

    setOtp(e.target.value);

  }

  const registerDonor = async () => {

    try {

     

      await axiosPost('donor/register/otpreceive', { email: decodedFormData.email, otp: otp });


    } catch (error) {
      alert(`Donor Create Fail ${error.message}`)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-stone-100 '>

      <div className=' border-8 p-[75px]' >
        <div>
          <center className='homepara text-[26px]'>Hi <span className='text-red-600 font-bold'>{decodedFormData.fullname}</span> Thanks for Register With Us</center>
          <center className='homepara text-[16px]'>Enter 4 Digit Code which Receive in Your Mobile No : <span className='text-red-600 font-bold'>{decodedFormData.mobile}</span></center>

        </div>

        <div className='w-full h-[300px] bg-slate-200 mt-[25px] p-[25px] border-2'>
          <center className='font-sans mb-[10px]'>Enter Otp</center>
          <center className='font-sans mb-[10px] '><input type='text' onChange={getOtp} className='w-[250px]' ></input></center>

          <center className='mb-[50px] '> <Button variant="contained" color="success" onClick={registerDonor}>Submit</Button></center>

          <center className='homepara mb-[10px]' >I Not Recive Otp Please Sen Agin</center>
          <center > <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button></center>
        </div>

      </div>


    </div>
  )
}

export default OtpReceive