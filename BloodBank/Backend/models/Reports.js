import mongoose from "mongoose";

const ReportsSchema = new mongoose.Schema({


    contactname: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },
   name: { type: String }

}

)

export default mongoose.model('Reports', ReportsSchema);