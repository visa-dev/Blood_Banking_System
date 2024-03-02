import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema({

    patientname: { type: String },
    doctorname: { type: String },
    bloodgroup: { type: String },
    hospitalname: { type: String },
    contactname: { type: String },
    othermsg: { type: String },
    email: { type: String },
    datewhenneed: { type: String },
    province: { type: String },
    district: { type: String },
    mobile: { type: Number },
    verified: { type: Boolean }

}

)

export default mongoose.model('BloodRequest', BloodRequestSchema);