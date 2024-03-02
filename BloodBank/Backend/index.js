import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';

import DonorRoutes from './routes/DonorRoutes.js';
import BloodRoutes from './routes/BloodRequestRoutes.js';
import CommonRoutes from './routes/CommonRoutes.js';



const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());


app.use('/donor', DonorRoutes);
app.use('/finder', BloodRoutes);
app.use('/home', CommonRoutes);


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://virajsachin05:QLN7cJnWlACXxa26@projects.25nyes3.mongodb.net/Blood_Management_System", {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);
    }
}






app.listen(8081, async () => {
    await connectDB();
    console.log("Database Running On 8081");
});