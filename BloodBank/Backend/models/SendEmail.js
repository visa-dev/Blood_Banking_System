import mongoose from "mongoose";

const SendEmailSchema = new mongoose.Schema({


    reciver_id: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },


}

)

export default mongoose.model('SendEmail', SendEmailSchema);