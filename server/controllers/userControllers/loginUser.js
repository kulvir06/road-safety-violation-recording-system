import login from "../../services/user/login";
import jwt from 'jsonwebtoken';
import authKey from "../../config/authKey";

const login_user = async (req, res, next) => {
    const data = req.body;

    await login(data, logResult);

    function logResult(RESULT) {        
        if(RESULT.LOGIN===true) {
            const token = jwt.sign(
                //payload Data
                {
                    id: RESULT.id,
                    type: RESULT.type
                },
                authKey.secret,
                {
                    expiresIn: '1h'//24 hours
                }
            );

            res.header("auth-token", token).json({
                error: null,
                data: {
                    token,
                    // role: RESULT.type
                },
            });
        }
        else res.json({
            message: "login error", 
            error: RESULT, 
            flag: false
        })
    }    
}

export default login_user;