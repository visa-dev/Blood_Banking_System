import express from "express";
import { createDonor, getDonors, login, findById, getNotifications, setNotifications, getAllDonors } from '../controllers/DonorControllers.js';

const router = express.Router();


router.post('/register', createDonor);
router.get('/finddonor/:blood/:province/:district', getDonors);
router.post('/login', login);
router.get('/byid/:id', findById);
router.get('/alldonors', getAllDonors);
router.get('/notification/:id', getNotifications);
router.post('/notification/', setNotifications);

export default router;