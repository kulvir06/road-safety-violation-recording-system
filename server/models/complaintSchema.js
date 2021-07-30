import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema ({
    // id: { type: String, required: true },
    reportedBy: { type: String, required: true },
    reportedLocation: { type: String, required: true },
    description: { type: String },
    imageUrl: [String],
    vehicleNumber: { type: String, required: true},
    transporterName: { type: String },
    transporterCode: { type: String },
    comments: { type: String },
    createdOn: { type: Date, default: Date.now },
    status: { type: String, enum: ["OPEN","CLOSED"], default: "OPEN" },
    remarks: { type: String, default: "None" }

});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;