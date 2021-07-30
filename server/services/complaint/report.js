import complaintModel from '../../models/complaintSchema';

const getReportData = async (flag, callback) => {
    const complaints = await complaintModel.find({
        createdOn: {
            $gte: new Date(new Date(flag.from).setHours(0, 0, 0)),
            $lt: new Date(new Date(flag.to).setHours(23,59, 59))
        }
    })

    callback(complaints);
}

module.exports = getReportData;