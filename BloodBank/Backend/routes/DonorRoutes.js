import express from "express";
import { createDonor, getDonors, login, findById } from '../controllers/DonorControllers.js';

const router = express.Router();


router.post('/register', createDonor);
router.get('/finddonor/:blood/:province/:district', getDonors);
router.post('/login', login);
router.get('/byid/:id', findById);

export default router;