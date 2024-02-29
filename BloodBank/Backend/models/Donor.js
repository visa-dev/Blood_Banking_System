import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({

    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number },
    password: { type: String },
    bloodgroup: { type: String },
    gender: { type: String },
    birthdate: { type: String },
    weight: { type: Number },
    lastdonationdate: { type: String },
    zipcode: { type: String },
    province: { type: String },
    tandc: { type: Boolean },
    district: { type: String },
    verified: { type: Boolean }

}

)

export default mongoose.model('Donor', DonorSchema);