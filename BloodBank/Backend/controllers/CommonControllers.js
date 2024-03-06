import Donor from "../models/Donor.js";
import BloodBank from "../models/BloodBank.js";


export const countOfDonors = async (req, res) => {

    try {

        const Apositive = await Donor.countDocuments({ bloodgroup: "A+" });
        const Anegative = await Donor.countDocuments({ bloodgroup: "A-" });
        const Bpositive = await Donor.countDocuments({ bloodgroup: "B+" });
        const Bnegative = await Donor.countDocuments({ bloodgroup: "B-" });
        const Opositive = await Donor.countDocuments({ bloodgroup: "O+" });
        const Onegative = await Donor.countDocuments({ bloodgroup: "O-" });
        const ABpositive = await Donor.countDocuments({ bloodgroup: "AB+" });
        const ABnegative = await Donor.countDocuments({ bloodgroup: "AB-" });

        const obj = [{ type: "A+", count: Apositive }, { type: "A-", count: Anegative }, { type: "B+", count: Bpositive }, { type: "B-", count: Bnegative }, { type: "O+", count: Opositive }, { type: "O-", count: Onegative }, { type: "AB+", count: ABpositive }, { type: "AB-", count: ABnegative }];

        res.status(200).json(obj);

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const bloodBankCount = async (req, res) => {

    try {


        const Apositive = await BloodBank.findOne({ type: "A+" });
        const Anegative = await BloodBank.findOne({ type: "A-" });
        const Bpositive = await BloodBank.findOne({ type: "B+" });
        const Bnegative = await BloodBank.findOne({ type: "B-" });
        const Opositive = await BloodBank.findOne({ type: "O+" });
        const Onegative = await BloodBank.findOne({ type: "O-" });
        const ABpositive = await BloodBank.findOne({ type: "AB+" });
        const ABnegative = await BloodBank.findOne({ type: "AB-" });

        const obj = [{ id: Apositive._id, type: "A+", count: Apositive.count }, { id: Anegative._id, type: "A-", count: Anegative.count }, { id: Bpositive._id, type: "B+", count: Bpositive.count }, { id: Bnegative._id, type: "B-", count: Bnegative.count }, { id: Opositive._id, type: "O+", count: Opositive.count }, { id: Onegative._id, type: "O-", count: Onegative.count }, { id: ABpositive._id, type: "AB+", count: ABpositive.count }, { id: ABnegative._id, type: "AB-", count: ABnegative.count }];

        res.status(200).json(obj);

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const bloodBankCheakAvailability = async (req, res) => {

    try {

        const blood = req.params.blood;
        const availability = await BloodBank.find({

            $and: [
                { count: { $gt: 0 } },
                { type: blood }
            ]
        });
        
        if (availability.length != 0) {
            res.status(200).json({ available: true });
        } else {
            res.status(201).json({ available: false });
        }


    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}


export const updateBloodBankCount = async (req, res) => {

    try {
        const { id, option, count } = req.params;

        if (option == "add") {

            await BloodBank.findByIdAndUpdate(id, { $inc: { count: 1 } });

        }
        else if (option == "sub") {
            await BloodBank.findByIdAndUpdate(id, { $inc: { count: -1 } });

        }


    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}


