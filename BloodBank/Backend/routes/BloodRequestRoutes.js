import express from "express";
import { createBloodRequest,requestsByBloodGroup,Allrequests } from '../controllers/BloodRequestController.js';

const router = express.Router();


router.post('/bloodrequest', createBloodRequest);
router.get('/requests/:blood', requestsByBloodGroup);
router.get('/allrequests', Allrequests);


export default router;