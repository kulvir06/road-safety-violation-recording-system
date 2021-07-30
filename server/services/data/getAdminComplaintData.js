import complaintModel from '../../models/complaintSchema';

const getData = async(src, callback) => {
    let complaints = [];
    let query = {
        _id: src._id,
        reportedBy: src.reportedBy,
        reportedLocation: src.reportedLocation,
        status: src.status
    }
    if(typeof(query._id)==="undefined" || query._id === "") delete query._id;
    if(typeof(query.reportedBy)==="undefined" || query.reportedBy === "") delete query.reportedBy
    if(typeof(query.reportedLocation)==="undefined" || query.reportedLocation === "") delete query.reportedLocation
    if(typeof(query.status)==="undefined" || query.status === "") delete query.status

    await complaintModel.find(query, (err,comp) => {
        if(err) callback(complaints)
        callback(comp)
    })
   
    
}

module.exports=(getData)