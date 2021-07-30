import locationController from "./locationController";
import transporterController from "./transporterController";
import complaintDataController from "./complaintDataController";
import adminComplaintDataController from "./adminComplaintDataController";

const getDataController = {};

getDataController.location = locationController;
getDataController.transporter = transporterController;
getDataController.complaint = complaintDataController;
getDataController.adminComplaint = adminComplaintDataController;

module.exports = getDataController;