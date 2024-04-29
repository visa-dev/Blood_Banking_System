import mongoose from "mongoose";

const AdminDataSchema = new mongoose.Schema({

    email:{type:String},
    password:{type:String},
    mobile:{type:Number},
    username:{type:String}
  

}

)

export default mongoose.model('AdminData', AdminDataSchema);