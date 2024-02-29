import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({

   
    email: { type: String, uniqe: true },
    otp: String, 
    createdAt: Date, expireAt: Date

}

)

export default mongoose.model('Otp', OtpSchema);