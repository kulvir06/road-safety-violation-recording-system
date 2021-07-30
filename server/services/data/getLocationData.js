import locationSchema from '../../models/locationSchema';

const getLocationData = async(callback) => {
    let data = [];
    const allLocations = await locationSchema.location.find();

    allLocations.forEach(element => {
        data.push({
            name: element.name
        }) 
                             
    });
    callback(data);  

}

module.exports = getLocationData;