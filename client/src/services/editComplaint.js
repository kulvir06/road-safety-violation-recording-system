import authService from "./authService";

const changeData = async (flag) => {
    return fetch('/update_complaint_data',{
        method: "POST",
        body: JSON.stringify(flag),
        headers: {
            "x-access-token": authService.authHeader(),
            "Content-Type": "application/json"
        }
    })
     .then(response => { return response.json() })
     .then(myJson => { return myJson })
}

export default changeData;