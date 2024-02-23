import express from "express";
import { createDonor,getDonors } from '../controllers/DonorControllers.js';

const router = express.Router();


router.post('/register', createDonor);
router.get('/finddonor/:blood/:province/:district',getDonors);


export default router;