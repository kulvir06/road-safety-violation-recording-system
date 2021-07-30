import getLocationData from '../../services/data/getLocationData'

const locationController = async (req, res, next) => {
    const logResult = (RESULT) => {
        res.json(RESULT);
    }
    await getLocationData(logResult);
    
}

export default locationController;