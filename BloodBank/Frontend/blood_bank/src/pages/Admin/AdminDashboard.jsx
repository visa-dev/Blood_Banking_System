import React from 'react'
import Header from '../../components/common/Header'
import { navLinks } from '../../assets/data/HeaderData';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Footer from '../../components/common/Footer';

const Home = () => {
    return (

        <div className='w-auto h-[100vh]'>
            <div>
                <Header navLinks={navLinks} />
            </div>
            <div className='flex justify-center gap-10 mt-[200px]'>
                <Button className="w-full lg:w-[250px] h-[60px]  " variant="contained">BLOOD BANK</Button>
                <Button className="w-full lg:w-[250px] h-[60px]  " variant="contained">donor</Button>
                <Button className="w-full lg:w-[250px] h-[60px]  " variant="contained">REQUESTS</Button>
            </div>
            <div>
                <Footer />
            </div>

        </div>



    )
}

export default Home