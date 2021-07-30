import complaintModel from "../../models/complaintSchema";

const  getData = async(src, callback) => {
    let complaints = []
    switch(src.flag){
        case "OPEN":
         complaints = await complaintModel.find({ reportedBy: src.id, status: "OPEN"});
         break;
        case "CLOSED":
         complaints = await complaintModel.find({ reportedBy: src.id, status: "CLOSED"});
         break;
        case "ALL":
         complaints = await complaintModel.find({ reportedBy: src.id });
         break;
    }
    callback(complaints);
}

module.exports = getData;