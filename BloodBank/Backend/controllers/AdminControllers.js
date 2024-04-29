import AdminData from "../models/AdminData.js";
import bcrypt from 'bcrypt';
export const createAdmin = async (req, res) => {

    try {
        const { username,password,email,mobile } = req.body;
        
   const hashed = await bcrypt.hash(password, 10);

        const admin = new AdminData({
            email,
            username,
            mobile,
            password:hashed
        });

        await admin.save();

        res.status(200).json({ success: true, message: 'Successfully Data Added' });
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email } = req.body;

        const adminprofile = await AdminData.findOne({ email: email });
        console.log(adminprofile);

        if (adminprofile != null) {

            const password = adminprofile.password;
            const profile_validate = await bcrypt.compare(req.body.password, password);

            if (profile_validate) {
                res.status(200).json({ success: true, id: adminprofile._id });
            } else {
                res.status(201).json({ success: false, message: "Password not match" });
            }
        } else {

            res.status(201).json({ success: false, message: `${email} No Account found` });
        }
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const findById = async (req, res) => {
    try {
        const admin = await AdminData.findById(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
