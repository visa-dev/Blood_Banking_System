import React, { useEffect } from 'react'

import { Link } from 'react-router-dom';


import blooddonor from '../../assets/images/home/blooddonor.png';
import blooddrop from '../../assets/images/home/blooddrop.png';

import Header from '../../components/common/Header';
import { navLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';

import Footer from '../../components/common/Footer';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { axiosGet } from '../../AxiosOperations';

import Spinner1 from '../../pages/spinners/Spinner1';

const Home = () => {

  const [bloodCount, setBloodCount] = React.useState([]);

  useEffect(() => {

    axiosGet('home/count')

      .then(data => {

        setBloodCount(data.data);

      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });


    return () => {
      // Cleanup code goes here
    };
  }, []);

  return (
    <div>
      <div>
        <Header navLinks={navLinks} />
      </div>
      <div className='flex justify-evenly  bg-slate-100 p-[20px] '>
        <div className='mt-[50px] w-[750px] p-[20px] '>
          <h1 className='text-pink-600 text-[40px] font-bold h1Text'>Donate Blood,</h1>
          <h1 className='text-pink-600 text-[40px] h1Text'>Give the</h1>
          <h1 className='text-pink-600 text-[40px] h1Text'>Gift of</h1>
          <h1 className='text-pink-600 text-[40px] h1Text'>Life.</h1>
          <p className='text-[12px] homepara'> By donating blood with LiveHeartZ, many lives are saved and hope
            is given to many whose situation may otherwise be hopeless.
            Blood donors give such patients a second chance of life.</p>
        </div>
        <div className='mt-[50px] w-[500px] flex justify-evenly pb-[20px] bg-slate-100'>
          <form>
            <div className='flex justify-center pt-[20px] font-bold'>
              Search Blood
            </div>
            <div className='mt-[20px]'>
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Blood</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Select Blood"

                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className='mt-[20px]'>
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Region</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Select Region"

                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className='mt-[20px]'>
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select District</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Select District"

                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className='flex justify-center mt-[20px]'>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="error">Find Blood</Button>
              </Stack>
            </div>
          </form>
        </div>
      </div>
      <div className='w-[100] h-[400px]  mt-[50px] m-[10px] flex justify-center bg-orange-400'>

        <div className='w-[600px] p-[30px]'>
          <h2 className='text-pink-600 text-[40px] font-bold h2Text '>Give Blood</h2>
          <h2 className='text-pink-600 text-[40px] font-bold h2Text'>Save A LIFE</h2>
          <p className='homepara mt -[25px] mb-[25px]'>If a consumer of a REST service needs to hard-code all the resource URLs,
            <br />then it is tightly then it is loosely coupled. There is no tight. There is no tight<br />
            dependency on the URI structure, <br />as it is specified and used from the response.</p>

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="error">Join Us</Button>
          </Stack>


        </div>

      </div>
      <div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-20 p-[20px]'>
        <div className='border-2 p-[25px] flex flex-col items-center  bg-slate-100 '>
          <div className='w-[150px] mb-[15px]'>
            <img src={blooddrop} alt="Blood Drop" className="mx-auto" />
          </div>
          <div className='text-center'>
            <h2 className='font-bold text-2xl mb-4'>REQUEST BLOOD</h2>
            <p className='homepara text-sm'>Some quick example text to build on the card title</p>
            <p className='homepara text-sm'>and make up the bulk of the card's content.</p>
            <a href="#" className='homepara text-sm block mt-4'>Go somewhere</a>
          </div>
          <div className='flex justify-center mt-6'>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="error" component={Link} to="/requestblood">Request Blood</Button>
            </Stack>
          </div>
        </div>
        <div className='border-2 p-[25px] flex flex-col items-center  bg-slate-100'>
          <div className='w-[150px] mb-[15px]'>
            <img src={blooddonor} alt="Blood Donor" className="mx-auto" />
          </div>
          <div className='text-center'>
            <h2 className='font-bold text-2xl mb-4'>FIND DONOR</h2>
            <p className='homepara text-sm'>Some quick example text to build on the card title</p>
            <p className='homepara text-sm'>and make up the bulk of the card's content.</p>
            <a href="#" className='homepara text-sm block mt-4'>Go somewhere</a>
          </div>
          <div className='flex justify-center mt-6'>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="error" component={Link} to={`/finddonor?verify=${encodeURIComponent(false)}`}>Find Donor</Button>
            </Stack>
          </div>
        </div>


      </div>
      <hr class="border-b-2 border-pink-600  m-[25px]" />
      <div className='flex justify-center'>
        <div className='grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2  p-[20px]'>
          {
            bloodCount.map((item) =>
              <div className='w-[100px] h-[100px] border-2 m-[25px] flex justify-center items-center bg-slate-200' >
                <div className='w-14 h-14 rounded-full border border-gray-500 bg-white'>
                  <center className='text-pink-600 font-bold '>{item.type}</center>
                  <center className='homepara text-[12px]'>{item.count}</center>
                </div>
              </div>

            )
          }

        </div>
      </div>
      <hr class="border-b-2 border-pink-600  m-[25px]" />
      <div className='mt-[10px]'>
        <Footer navLinks1={socialLinks} navLinks2={contactData} />

      </div>
    </div>
  )
}

export default Home