import update from '../../services/complaint/update';

const update_complaint = async(req, res, next) => {
    const data = req.body;

    await update(data, logResult)
    function logResult(RESULT) {
        console.log(RESULT);
        res.json({ message: RESULT });
    }
}

export default update_complaint;
