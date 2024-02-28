import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { navLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';
import Chat from '../../popups/Chat';
import { axiosGet } from '../../AxiosOperations';
import testImg from '/user.png';

import Spinner1 from '../../pages/spinners/Spinner1';

const FindDonor = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [donorList, setDonorList] = useState([]);
  const [formData, setFormData] = useState({
    bloodgroup: 'Select',
    province: 'Select',
    district: 'Select',
  });

  const handleChnage = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
   
  };

  const validateFormData = () => {
    const errors = {};
    if (formData.bloodgroup.trim() === "Select") {
      errors.bloodgroup = 'BloodGroup is required';
    }
    if (formData.province.trim() === "Select") {
      errors.province = 'Province is required';
    }
    if (formData.district.trim() === "Select") {
      errors.district = 'District is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getDonorsList = async () => {
    if (validateFormData()) {
      await axiosGet(`donor/finddonor/${formData.bloodgroup}/${formData.province}/${formData.district}`)
        .then(data => {
          setDonorList(data.data);
        }).then(setInterval(() => {
          setLoading(false);
        }, 500))
        .then(() => {
          // Show chat after fetching donor list
          setChatVisible(true);
        });
    }
  };

  const [chatVisible, setChatVisible] = useState(false);

  return (
    <div>
      <Header navLinks={navLinks} />
      <div className='flex flex-col'>
        <form>
          <div className='flex sm:min-w-500 justify-center pt-[20px] font-bold '>
            Search Blood
          </div>
          <div className='grid lg:grid-cols-3 gap-4  ml-[150px] mr-[150px] p-[25px] '>
            <div>
              <label >Blood Group</label>
              <select name="bloodgroup" onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
                <option value="Select">Select</option>
                <option value='A-'>A-</option>
                <option value="A+">A+</option>
                <option value="AB-">AB-</option>
                <option value="AB+">AB+</option>
                <option value="B-">B-</option>
                <option value="B+">B+</option>
                <option value="O-">O-</option>
                <option value="O+">O+</option>
              </select>
              {errors.bloodgroup && <span className="text-red-500">{errors.bloodgroup}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-[5px]">
                Province
              </label>
              <select name="province" onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
                <option value="Select">Select</option>
                <option value="Sabaragamuwa">Sabaragamuwa</option>
              </select>
              {errors.province && <span className="text-red-500">{errors.province}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-[5px]">
                District
              </label>
              <select name="district" onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
                <option value="Select">Select</option>
                <option value="Kegalle">Kegalle</option>
              </select>
              {errors.district && <span className="text-red-500">{errors.district}</span>}
            </div>
            <div className='flex'>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="error" onClick={getDonorsList}>Find Blood</Button>
              </Stack>
            </div>
          </div>
        </form>
      </div>

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
                <div className='grid grid-cols-2'>
                  <div>
                    {chatVisible && <Chat name={item.fullname} id={item._id} />}
                  </div>
                  <div>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" className='w-full'>Email</Button>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>)

      ) : (
        <div className='flex justify-center w-full/2 h-[500px] items-center bg-slate-200 m-[20px] homepara'>No Available Donor/Not Select All Fields</div>
      )}

      <Footer navLinks1={socialLinks} navLinks2={contactData} />
    </div>
  );
}

export default FindDonor;
