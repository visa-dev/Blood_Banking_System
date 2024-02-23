import Donor from "../models/Donor.js";

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

        
        res.status(200).json({ Ap: Apositive, An: Anegative, Bp: Bpositive, Bn: Bnegative, Op: Opositive, On: Onegative, ABp: ABpositive, ABn: ABnegative });

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}