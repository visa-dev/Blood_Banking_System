import express from "express";
import { createBloodRequest,requestsByBloodGroup } from '../controllers/BloodRequestController.js';

const router = express.Router();


router.post('/bloodrequest', createBloodRequest);
router.get('/requests/:blood', requestsByBloodGroup);


export default router;