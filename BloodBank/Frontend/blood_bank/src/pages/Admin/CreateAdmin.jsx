import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { axiosPost } from '../../AxiosOperations';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    mobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data validation
    if (!formData.email || !formData.password || !formData.username || !formData.mobile) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axiosPost('admin/createadmin', formData);
      if (response.status === 200) {
        alert("Admin created successfully");
        resetForm();
      } else {
        throw new Error('Failed to create admin');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create admin');
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      username: '',
      mobile: ''
    });
  };

  return (
    <div className="flex justify-center mt-[100px]">
      <form className="w-full max-w-md mt-6" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4 font-bold text-2xl">Admin Registration Form</h2>
        <div className="mb-4">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Mobile"
            variant="outlined"
            type="tel"
            fullWidth
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center">
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
