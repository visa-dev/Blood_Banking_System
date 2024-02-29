import Donor from "../models/Donor.js";
import Notification from "../models/Notification.js";
import Otp from "../models/Otp.js";

import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import OTPGenerator from 'otp-generator';

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "project.works033@gmail.com",
        pass: "bvpwshpfewgvrmlj"
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

export const createOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otpToken = OTPGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const mailOptions = {
            from: "project.works033@gmail.com",
            to: email,
            subject: "Verify Your Email",
            html: `<p>Otp is ${otpToken}</p>`
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

export const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const otpRecords = await Otp.find({ email });

        if (otpRecords.length <= 0) {
            return res.status(404).json({ success: false, message: "Account record doesn't exist or has been verified already" });
        }

        const { expireAt } = otpRecords[0];
        const hashedOtp = otpRecords[0].otp;

        if (expireAt < Date.now()) {
            console.log("OTP EXPIRED");
            await Otp.deleteMany({ email });
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        const validOtp = await bcrypt.compare(otp, hashedOtp);

        if (validOtp) {
            await Donor.updateOne({ email }, { verified: true });
            await Otp.deleteMany({ email });
            console.log("OTP MATCHED");
            return res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            console.log("OTP NOT MATCHED");
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
        const filter = { email: req.body.email }
        const donorprofile = await Donor.findOne(filter);

        if (donorprofile != null) {
            const password = donorprofile.password;
            const profile_validate = await bcrypt.compare(req.body.password, password);

            if (profile_validate) {
                res.status(200).json(donorprofile);
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
