import complaintModel from "../../models/complaintSchema";

const create = async(data, callback) => {
    const complaint = new complaintModel(data);
    try{
        await complaint.save();
        console.log("complaint registered sucessfully");
        callback(true);
    } catch(error) {
        callback(error);
    }
}


module.exports = create;
  