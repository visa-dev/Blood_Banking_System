import BloodRequest from "../models/BloodRequest.js";


export const createBloodRequest = async (req, res) => {

    try {
        
        const { patientname, email, mobile, othermsg, bloodgroup, gender, hospitalname, contactname, doctorname, datewhenneed, province, district, tandc } = req.body;
        const bloodRequest = new BloodRequest({
            patientname,
            doctorname,
            bloodgroup,
            gender,
            hospitalname,
            contactname,
            othermsg,
            email,
            datewhenneed,
            province,
            district,
            mobile,
            tandc
        });


        await bloodRequest.save();

        res.status(200).json({ success: true, message: 'Sucsessfully Data Added' });

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}