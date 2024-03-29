
import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import header_logo from '../../assets/images/header/header_logo.jpg';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const Header = (props) => {

    const headerRef = useRef(null);
    const menuRef = useRef(null);

    const [blood, setBlood] = useState('');

    const handleStickyHeader = () => {

        window.addEventListener('scroll', () => {

            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {

                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }

        })

    };

    useEffect(() => {
        //handleStickyHeader();
        setBlood(props.blood);
        return () => window.removeEventListener('scroll', handleStickyHeader);
    });


    const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

    return (
        <header className='header '>
            <div className="container flex justify-around gap-5 ">

                <div className='w-[100px] flex items-center  '>
                    <img className="w-20 h-20 bg-gray-200 border rounded-full" src={header_logo}></img>

                </div>
                <div>{blood}</div>
                <div className='navigation ' ref={menuRef} onClick={toggleMenu} >

                    <ul className="menu flex gap-[2.7rem] ">

                        {
                            props.navLinks.map((link, index) =>
                                <li key={index} >
                                    {!props.donorloged &&
                                        <NavLink to={link.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-te text-[16px] leading-7 font-[500] hover:text-red-600'} >{link.display}</NavLink>
                                    }

                                </li>
                            )
                        }
                    </ul>
                </div>
                {
                    props.donorloged ? (<div className='flex items-center gap-5 '>
                        <Stack >
                            <Button variant="outlined" color='error' component={Link} to="/login">Logout</Button>
                        </Stack>

                    </div>) : (<div className='flex items-center gap-5'>
                        <Stack >
                            <Button variant="outlined" component={Link} to="/register" >Register</Button>
                        </Stack>
                        <Stack >
                            <Button variant="outlined" color='error' component={Link} to="/login">Login</Button>
                        </Stack>
                        <Stack >
                            <Button variant="outlined" color='error' component={Link} to="/admin/login">Admin</Button>
                        </Stack>
                    </div>
                    )
                }


                <div className='flex items-center gap-4'>

                    <span className='md:hidden' onClick={toggleMenu}>
                        {<BiMenu className='w-6 h-6 cursor-pointer' />}

                    </span>


                </div>


            </div>



        </header >
    );

}

export default Header