import complaintModel from '../../models/complaintSchema';

const updateComplaint = async (data, callback) => {
    const doc = await complaintModel.find({ _id: data._id });
    console.log(doc);
    doc[0].remarks = data.remarks;
    doc[0].status = data.status;
    await doc[0].save().then((x)=>callback(true)).catch((err) => callback(false));
}

module.exports = updateComplaint;