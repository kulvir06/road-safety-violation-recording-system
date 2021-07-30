import getTransporterData from '../../services/data/getTransporterData';

const transporterController = async (req, res, next) => {
    const logResult = (RESULT) => {
        res.json(RESULT);
    }
    await getTransporterData(logResult);
}

export default transporterController;