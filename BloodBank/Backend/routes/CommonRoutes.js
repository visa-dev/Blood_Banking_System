import express from "express";
import { bloodBankCount, countOfDonors, updateBloodBankCount } from "../controllers/CommonControllers.js";

const router = express.Router();


router.get('/count', countOfDonors);
router.get('/bloodbank/count', bloodBankCount);
router.get('/bloodbank/updatecount/:id/:count/:option', updateBloodBankCount);

export default router;