import express from "express";
import { setReports, getReportCount } from '../controllers/ReportsController.js';


const router = express.Router();


router.post('/setreport', setReports);
router.get('/getreport', getReportCount);



export default router;