import transporterSchema from '../../models/transporterSchema';

const getTransporterData = async(callback) => {
    let data = [];
    const allTransporters = await transporterSchema.transporter.find();

    allTransporters.forEach(element => {
        data.push({
            name: element.name,
            id: element.id
        })
    
    });
    callback(data);
}

module.exports = getTransporterData;