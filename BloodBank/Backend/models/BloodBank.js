import mongoose from "mongoose";

const BloodBankSchema = new mongoose.Schema({

    type: { type: String },
    count:{type:Number},

}

)

export default mongoose.model('BloodBank', BloodBankSchema);