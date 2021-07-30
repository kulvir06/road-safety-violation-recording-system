import mongoose from 'mongoose';
import locationData from '../config/locationData';

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const Location = mongoose.model("Location", locationSchema);

const addData = () => {
    locationData.forEach(async (e) => {
        const data = new Location(e);
        try {
            await data.save();
        } catch (error) {
            console.error(error);            
        }
    })
}

const obj = {};
obj.addData = addData;
obj.location = Location;

module.exports = obj;