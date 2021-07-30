import getReport from '../../services/complaint/report';

const report = async(req, res, next) => {
    const data = req.body;
    await getReport(data,logResult);
    function logResult(RESULT) {
        res.json(RESULT);
    }
}

export default report;