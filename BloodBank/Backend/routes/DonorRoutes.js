import express from "express";
import { createDonor, getDonors, login, findById, getNotifications, setNotifications, getAllDonors, registerCreateOtp, registerVerifyOtp, setEmail, blodRequestCreateOtp, bloodRequestVerifyOtp, deleteDonor,getDonorsByProvince } from '../controllers/DonorControllers.js';


const router = express.Router();


router.post('/register', createDonor);
router.get('/finddonor/:blood/:province/:district', getDonors);
router.get('/finddonor/:blood/:province', getDonorsByProvince);
router.post('/login', login);
router.get('/byid/:id', findById);
router.get('/alldonors', getAllDonors);
router.get('/notification/:id', getNotifications);
router.post('/notification/', setNotifications);
router.get('/delete/:email', deleteDonor);
router.post('/sendemail', setEmail);

router.post('/register/otpsend', registerCreateOtp);
router.post('/register/otpreceive', registerVerifyOtp);

router.post('/bloodrequest/otpsend', blodRequestCreateOtp);
router.post('/bloodrequest/otpreceive', bloodRequestVerifyOtp);


export default router;