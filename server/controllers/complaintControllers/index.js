import create_new_complaint from "./createComplaint";
import update_complaint from "./updateComplaint";
import report from './report';

const complaintController = {};

complaintController.create_new_complaint = create_new_complaint;
complaintController.update_complaint = update_complaint;
complaintController.report = report;

module.exports = complaintController;