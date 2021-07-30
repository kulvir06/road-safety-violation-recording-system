import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    id: { type: String, required: true } ,
    password: { type: String, required: true } ,
    type: { type: String, enum: ["ADMIN", "VIEWER"], required: true } ,
    lastLogin: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now }
    // currentToken: String,
    // currentTokenTimestamp: Date
    // modifiedOn: Date
    
});

const User = mongoose.model("User", userSchema);

export default User;