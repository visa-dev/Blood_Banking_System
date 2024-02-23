import React from 'react'
import { useState } from 'react';
import { axiosPost } from '../../AxiosOperations';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import { navLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const RequestBlood = () => {

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    patientname: '',
    doctorname: '',
    bloodgroup: 'Select',
    hospitalname: '',
    contactname: '',
    othermsg: '',
    email: '',
    datewhenneed: '',
    province: 'Select',
    district: 'Select',
    mobile: ''

  });

  const handleChnage = (e) => {
    const { value, name } = e.target;
    //console.log(value, name);
    setFormData({ ...formData, [name]: value });

  }

  const validateFormData = () => {

    const errors = {};

    if (!formData.patientname.trim()) {
      errors.patientname = "Patient name required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile is required"
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile not valid';
    }
    if (!formData.doctorname) {
      errors.doctorname = 'Doctor name is required';
    }
    if (!formData.contactname) {
      errors.contactname = 'Contact name is required';
    }
    if (!formData.datewhenneed.trim()) {
      errors.datewhenneed = 'Date when needed is required';
    }
    if (formData.bloodgroup.trim() === "Select") {
      errors.bloodgroup = 'BloodGroup is required';
    }
    if (!formData.hospitalname.trim()) {
      errors.hospitalname = 'Hospital name is required';
    }

    if (!formData.othermsg.trim()) {
      errors.othermsg = 'Other msg is required';
    }
    if (formData.province.trim() === "Select") {
      errors.province = 'Province is required';
    }
    if (formData.district.trim() === "Select") {
      errors.district = 'District is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }


  const createBloodRequest = async () => {

    try {
      if (validateFormData()) {
        axiosPost('finder/bloodrequest', JSON.stringify(formData));
        alert("Succsessfully Requested");
      } 
    } catch (error) {
      alert("Request Fail");
    }
   

  }

  return (
    <div>
      <div>
        <Header navLinks={navLinks} />
      </div>

      <div className='ml-[150px] mt-[20px] mb-[10px] font-bold formheading'>Patient Details</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pl-[150px] pr-[150px] mb-[20px] ">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Patient Name
          </label>
          <input
            type="text"
            name="patientname"
            value={formData.patientname}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100 "
            required
            onChange={handleChnage}

          />
          {errors.patientname && <span className="text-red-500">{errors.patientname}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Doctor Name
          </label>
          <input
            type="text"
            name="doctorname"
            value={formData.doctorname}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.doctorname && <span className="text-red-500">{errors.doctorname}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Blood Group
          </label>
          <select name="bloodgroup" value={formData.bloodgroup} onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
            <option value="Select">Select</option>
            <option value='A-'>A-</option>
            <option value="A+">A+</option>
            <option value="AB-">AB</option>
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
          <select name="province" value={formData.province} onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
            <option value="Select">Select</option>
            <option value="Sabaragamuwa">Sabaragamuwa</option>
          </select>
          {errors.province && <span className="text-red-500">{errors.province}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            District
          </label>
          <select name="district" value={formData.district} onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
            <option value="Select">Select</option>
            <option value="Kegalle">Kegalle</option>
          </select>
          {errors.district && <span className="text-red-500">{errors.district}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Hospital Name
          </label>
          <input
            type="text"
            name="hospitalname"
            value={formData.hospitalname}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.hospitalname && <span className="text-red-500">{errors.hospitalname}</span>}
        </div>
      </div>

      <div className='ml-[150px] mt-[20px] mb-[10px] font-bold formheading'>Contact Details</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pl-[150px] pr-[150px] mb-[20px]">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Contact Name
          </label>
          <input
            type="text"
            name="contactname"
            value={formData.contactname}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.contactname && <span className="text-red-500">{errors.contactname}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Date When Need
          </label>
          <input
            type="date"
            value={formData.datewhenneed}
            name="datewhenneed"
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.datewhenneed && <span className="text-red-500">{errors.datewhenneed}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Other Messages
          </label>
          <textarea type="text"
            name="othermsg"
            value={formData.othermsg}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage} cols="100" rows="5"></textarea>
          {errors.othermsg && <span className="text-red-500">{errors.othermsg}</span>}
        </div>
      </div>


      <div className='ml-[150px] mb-[25px]'>
        <Stack direction="row" spacing={2}>

          <Button variant="contained" color="success" className='w-[200px] h-[40px]' onClick={createBloodRequest}>
            Request Blood
          </Button>

        </Stack>
      </div>
      <div>
        <Footer navLinks1={socialLinks} navLinks2={contactData} />
      </div>
    </div>
  )
}

export default RequestBlood