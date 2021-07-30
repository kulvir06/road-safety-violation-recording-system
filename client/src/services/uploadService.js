import authService from "./authService";
const uploadComplaint = async(data) => {
    return fetch("/upload_complaint",{
        method: "POST",
        headers: { 
            "x-access-token" : authService.authHeader(),
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
     .then(response => { return response.json(); })
     .then(myJson => { return myJson });
}

export default uploadComplaint;