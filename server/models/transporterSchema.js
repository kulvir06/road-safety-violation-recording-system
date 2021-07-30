import mongoose from 'mongoose';
import transporterData from '../config/transporterData';

const transporterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true}
});

const Transporter = mongoose.model("Transporter", transporterSchema);

const addData = () => {
    transporterData.forEach(async (e) => {
        const data = new Transporter(e);
        try {
            await data.save();
        } catch (error) {
            console.error(error);            
        }
    })
}

const obj = {} ;

obj.addData = addData;
obj.transporter = Transporter;

module.exports = obj;