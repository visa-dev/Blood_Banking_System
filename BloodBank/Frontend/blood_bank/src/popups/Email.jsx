import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { axiosGet, axiosPost } from '../AxiosOperations';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function Email(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const [profile, setProfile] = useState({});

    const [notifications, setNotifications] = useState([]);
    const [errors, setErrors] = useState({});

    let [formData, setFormData] = useState({
        reciver_id: props.id,
        message: '',
        subject: '',
        email: ''

    });

    const validateFormData = () => {

        const errors = {};

        if (!formData.message.trim()) {
            errors.fullname = "Please enter message";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleChnage = (e) => {

        const { value, name } = e.target;
        //console.log(value, name);
        setFormData({ ...formData, [name]: value });


    }



    const sendEmail = () => {


        axiosPost('donor/sendemail', JSON.stringify(formData));
        alert("Message Send Succsessfully");

        handleClose();


    }


    return (
        <React.Fragment >
            <Button variant="outlined" className='w-full' onClick={handleClickOpen}>
                Email
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}


            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <div className='homepara font-bold'>Email To - {props.email}</div>
                </DialogTitle>
                <hr className='border-2 m-[15px]' />
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent className='row-span-1 '>


                    <div className='flex'>
                        <div className='homepara w-[100px] h-[40px] mt-[5px]'><label >From : </label></div>
                        <div className='w-full'><input type="text" placeholder='Sender Mail' name='email' className='border-2 w-full h-[40px]' onChange={handleChnage} value={formData.email} /></div>
                    </div>
                    <div className='flex'>
                        <div className='homepara w-[100px] h-[40px] mt-[5px]'><label >Subject : </label></div>
                        <div className='w-full'><input type="text" name='subject' className='border-2 w-full h-[40px]' onChange={handleChnage} value={formData.subject} /></div>
                    </div>

                    <div >
                        <textarea name="message" onChange={handleChnage} value={formData.message} placeholder='Enter Message Hear' cols="60" rows="5" className='border-2'></textarea>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={sendEmail}>
                        Send
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
