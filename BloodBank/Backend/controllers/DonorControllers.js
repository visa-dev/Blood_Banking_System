import Donor from "../models/Donor.js";
import bcrypt from 'bcrypt';


export const createDonor = async (req, res) => {

    try {
        //console.log(req.body);
        const { fullname, email, mobile, password, bloodgroup, gender, birthdate, weight, lastdonationdate, zipcode, province, district, tandc } = req.body;

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
            tandc
        });


        await donor.save();

        res.status(200).json({ success: true, message: 'Sucsessfully Data Added' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const getDonors = async (req, res) => {

    const filter = { bloodgroup: req.params.blood, province: req.params.province, district: req.params.district }

    try {

        const donors = await Donor.find(filter);
        res.status(200).json(donors);

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const login = async (req, res) => {

    const filter = { email: req.body.email }

    try {

        const donorprofile = await Donor.findOne(filter);

        if (donorprofile != null) {

            const password = donorprofile.password;  //must want to  store can't accsess directly
            const profile_validate = await bcrypt.compare(req.body.password, password);

            if (profile_validate) {

                res.status(200).json(donorprofile);
            }
        }


    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const findById = async (req, res) => {

    try {

        const donor = await Donor.findById(req.params.id);

        res.status(200).json(donor);

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}