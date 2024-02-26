import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({


    reciver_id: { type: String },
    sendername: { type: String },
    subject: { type: String },
    message: { type: String },


}

)

export default mongoose.model('Notification', NotificationSchema);