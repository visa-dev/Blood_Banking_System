import Donor from "../models/Donor.js";
import AdminData from "../models/AdminData.js";
import Notification from "../models/Notification.js";
import Otp from "../models/Otp.js";
import Reports from "../models/Reports.js";


import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import OTPGenerator from 'otp-generator';
import SendEmail from "../models/SendEmail.js";
import BloodRequest from "../models/BloodRequest.js";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "liveheartzbloodbank@gmail.com",
        pass: "bmshexgnqsyckqth"
    }
});

export const createDonor = async (req, res) => {
    try {
        const { fullname, email, mobile, password, bloodgroup, gender, birthdate, weight, lastdonationdate, zipcode, province, district, tandc } = req.body;

        const existingUser = await Donor.findOne({ email });

        if (existingUser) {

            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);

        const donor = new Donor({
            fullname,
            email,
            mobile,
            password: hashed,
            bloodgroup,
            gender,
            birthdate,
            weight,
            lastdonationdate,
            zipcode,
            province,
            district,
            tandc,
            verified: false
        });

        await donor.save();

        res.status(201).json({ success: true, message: 'Successfully Data Added' });
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const registerCreateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otpToken = OTPGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const mailOptions = {
            from: "liveheartzbloodbank@gmail.com",
            to: email,
            subject: "Verify Your Email For Register",
            html: `<p>Your OTP is <span style="color: red; font-size: 20px; font-family: Arial, sans-serif; font-weight: bold;">${otpToken}</span></p>`
        }

        const newOtp = new Otp({
            email,
            otp: await bcrypt.hash(otpToken, 10),
            createdAt: Date.now(),
            expireAt: Date.now() + 3600000,
        });

        await newOtp.save();
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const registerVerifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const otpRecords = await Otp.find({ email });

        if (otpRecords.length <= 0) {
            return res.status(404).json({ success: false, message: "Account record doesn't exist or has been verified already" });
        }

        const { expireAt } = otpRecords[0];
        const hashedOtp = otpRecords[0].otp;

        if (expireAt < Date.now()) {
            // console.log("OTP EXPIRED");
            await Otp.deleteMany({ email });
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        const validOtp = await bcrypt.compare(otp, hashedOtp);

        if (validOtp) {

            await Donor.updateOne({ email }, { verified: true });
            await Otp.deleteMany({ email });
            // console.log("OTP MATCHED");
            return res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            // console.log("OTP NOT MATCHED");
            return res.status(400).json({ success: false, message: "Incorrect OTP" });
        }
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const blodRequestCreateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otpToken = OTPGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const mailOptions = {
            from: "liveheartzbloodbank@gmail.com",
            to: email,
            subject: "Verify Your Email For Send Blood Request",
            html: `<p>Your OTP is <span style="color: red; font-size: 20px; font-family: Arial, sans-serif; font-weight: bold;">${otpToken}</span></p>`
        }

        const newOtp = new Otp({
            email,
            otp: await bcrypt.hash(otpToken, 10),
            createdAt: Date.now(),
            expireAt: Date.now() + 3600000,
        });

        await newOtp.save();
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const bloodRequestVerifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const otpRecords = await Otp.find({ email });

        if (otpRecords.length <= 0) {
            return res.status(404).json({ success: false, message: "Account record doesn't exist or has been verified already" });
        }

        const { expireAt } = otpRecords[0];
        const hashedOtp = otpRecords[0].otp;

        if (expireAt < Date.now()) {
            // console.log("OTP EXPIRED");
            await Otp.deleteMany({ email });
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        const validOtp = await bcrypt.compare(otp, hashedOtp);

        if (validOtp) {
            await BloodRequest.updateOne({ email }, { verified: true });
            await Otp.deleteMany({ email });
            // console.log("OTP MATCHED");
            return res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            // console.log("OTP NOT MATCHED");
            return res.status(400).json({ success: false, message: "Incorrect OTP" });
        }
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}





export const getDonors = async (req, res) => {
    try {
        const filter = { bloodgroup: req.params.blood, province: req.params.province, district: req.params.district }
        const donors = await Donor.find(filter);

        res.status(200).json(donors);
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}



export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.status(200).json(donors);
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email } = req.body;

        const donorprofile = await Donor.findOne({ email: email });




        if (donorprofile != null) {

            const password = donorprofile.password;
            const profile_validate = await bcrypt.compare(req.body.password, password) & donorprofile.verified == true;

            if (profile_validate) {
                res.status(200).json({ success: true, id: donorprofile._id ,role:'donor'});
            } else {
                res.status(201).json({ success: false, message: "Password not match" });
            }
        } else {
            const adminprofile = await AdminData.findOne({ email: email });
            const password = adminprofile.password;
            const profile_validate = await bcrypt.compare(req.body.password, password);

            if (profile_validate) {
                res.status(200).json({ success: true, id: adminprofile._id ,role:'admin'});
            } else {
                res.status(201).json({ success: false, message: "Password not match" });
            }
            
        }
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}



export const findById = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        res.status(200).json(donor);
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ reciver_id: req.params.id });
        res.status(200).json(notifications);
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const setNotifications = async (req, res) => {
    try {
        const { reciver_id, message, sendername, subject } = req.body;
        const notification = new Notification({
            reciver_id,
            message,
            sendername,
            subject
        });

        await notification.save();
        res.status(200).json({ success: true, message: 'Successfully Data Added' });
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const setEmail = async (req, res) => {
    try {

        const { data, receiverId } = req.body;

        const reciver = await Donor.findById(receiverId);


        const emailsend = new SendEmail({
            receiverId,

        });

        const mailOptions = {
            from: "liveheartzbloodbank@gmail.com",
            to: reciver.email,
            subject: "Blood Request",
            html:
                `<div>

                <h2>Patient Information</h2>
                <ul>
                    <li><strong>Patient Name:</strong>${data.patientname}</li>
                    <li><strong>Doctor Name:</strong>${data.doctorname}</li>
                    <li><strong>Blood Group:</strong>${data.bloodgroup}</li>
                    <li><strong>Needed Date:</strong>${data.datewhenneed}</li>
                    <li><strong>Hospital Name:</strong>${data.hospitalname}</li>
                    <li><strong>Message Date:</strong>${data.othermsg}</li>
                    <li><strong>Email:</strong>${data.email}</li>
                    <li><strong>Mobile:</strong>${data.mobile}</li>
                </ul>
            
                 <div/>`

        }

        await transporter.sendMail(mailOptions);
        await emailsend.save();
        res.status(200).json({ success: true, message: 'Successfully Send Email' });
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteDonor = async (req, res) => {
    try {
        const email = req.params.email;

        await Reports.findOneAndDelete({ email });
        const deletedDonor = await Donor.findOneAndDelete({ email });

        if (deletedDonor) {
            res.status(200).json({ message: 'Donor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Donor not found' });
        }
    } catch (error) {

        res.status(500).json({ success: false, message: 'Server error' });
    }
}
