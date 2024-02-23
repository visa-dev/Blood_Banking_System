import express from "express";
import { countOfDonors } from "../controllers/CommonControllers.js";

const router = express.Router();


router.get('/count', countOfDonors);



export default router;