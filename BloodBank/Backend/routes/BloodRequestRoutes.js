import express from "express";
import { createBloodRequest } from '../controllers/BloodRequestController.js';

const router = express.Router();


router.post('/bloodrequest', createBloodRequest);



export default router;