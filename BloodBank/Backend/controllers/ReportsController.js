import Reports from "../models/Reports.js";

export const setReports = async (req, res) => {

    try {

        const { contactname, email, subject, message, name } = req.body;

        const report = new Reports({
            contactname,
            email,
            subject,
            message,
            name
        });

        report.save();
        res.status(200).json({ message: "Report set succsessfully" });

    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}

export const getReportCount = async (req, res) => {

    try {

        const reports = await Reports.aggregate([
            {
                $group: {
                    _id:"$email" ,
                    count: { $sum: 1 },
                  
                }
            }
        ]);
        res.status(200).json(reports);


    } catch (error) {
        res.status(400).json({ success: false, message: `Some Error Occured ${error.message}` });

    }
}