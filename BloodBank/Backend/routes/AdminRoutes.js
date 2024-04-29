import express from "express";
import { createAdmin,adminLogin,findById } from "../controllers/AdminControllers.js";

const router = express.Router();


router.post('/createadmin', createAdmin);
router.post('/login', adminLogin);
router.get('/byid/:id',findById);


export default router;