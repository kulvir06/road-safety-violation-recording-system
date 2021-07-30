import jwt_decode from "jwt-decode"

function logoutUser() {
    localStorage.removeItem("user");
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.token){
        return user.token 
    } else {
        return null;
    }
}
async function validateUser() {
    const requestValidation = () => fetch("/user_dashboard",{
        method: "POST",
        headers: { "x-access-token": authHeader() }
    })
     .then(response => { return response.json(); })
     .then(myJson => { return myJson })

    return requestValidation();
} 

function getCurrentUserPayload() {
    let payload = "";
    payload = (jwt_decode(getCurrentUser().token))
    return payload;
}


const authService = {
    logoutUser,
    getCurrentUser,
    authHeader,
    validateUser,
    getCurrentUserPayload
}

export default authService;