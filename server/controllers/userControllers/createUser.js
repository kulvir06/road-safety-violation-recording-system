import create from "../../services/user/create";


const create_new_user = async (req, res, next) => {
    const data = req.body;
    await create(data, logResult);
    
    function logResult(RESULT) {
        if(RESULT===true) res.json({message: "OK", flag: true})
        else res.json({message: "error", flag: false})
    }    
}

export default create_new_user;