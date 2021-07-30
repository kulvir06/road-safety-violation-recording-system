import getComplaintData from '../../services/data/getAdminComplaintData';

const adminComplaintDataController = async (req, res, next) => {
    const flag = req.body;
    const logResult = (RESULT) => {
        res.json(RESULT);
    }
    await getComplaintData(flag, logResult)
}

module.exports = adminComplaintDataController;