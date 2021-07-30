import create from "../../services/complaint/create";

const create_new_complaint = (req, res, next) => {
    const data = req.body;
    create(data, logResult);

    function logResult(RESULT) {
        res.json({ message: RESULT });
    }
}

export default create_new_complaint;