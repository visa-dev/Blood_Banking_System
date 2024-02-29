import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import { axiosPost } from '../AxiosOperations';

const OtpSend = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const formdata = searchParams.get("formdata");


    var decodedFormData = JSON.parse(formdata);


    const [inputmobile, setInputMobile] = useState(0);

    const navigetor = useNavigate();

    const getMobileNumber = (e) => {

        setInputMobile(e.target.value);

    }

    const cheakOperations = async () => {

        if (decodedFormData.mobile === inputmobile) {


            await axiosPost(`donor/register/otpsend`, { email: decodedFormData.email });

            navigetor(`/register/otpreceive?formdata=${encodeURIComponent(JSON.stringify(decodedFormData))}`);
        } else {
            alert("Mobile Number Incorrect");
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-stone-100 '>

            <div className=' border-8 p-[75px]'>
                <div>

                    <center className='homepara text-[26px]'>Hi <span className='text-red-600 font-bold'>{decodedFormData.fullname}</span> </center>
                    <center className='homepara text-[16px]'>Enter Your Mobile Number  07**** {decodedFormData.mobile.substring(10 - 4)} </center>

                </div>

                <div className='w-full h-[300px] bg-slate-200 mt-[25px] p-[75px] border-2'>
                    <center className='font-sans mb-[10px]'>Enter Number</center>
                    <center className='font-sans mb-[10px] '><input type='text' className='w-[250px]' onChange={getMobileNumber} ></input></center>

                    <center > <Button variant="contained" onClick={cheakOperations} endIcon={<SendIcon />}>
                        Send
                    </Button></center>


                </div>

            </div>


        </div>
    )
}

export default OtpSend