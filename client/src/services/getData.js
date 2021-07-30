import authService from "./authService"

const getLocationData = async() => {
    return fetch("/get_location_data",{
        method: "POST",
        headers: {
            "x-access-token" : authService.authHeader()
        }
    })
     .then(response => { return response.json() })
     .then(myJson => { return myJson });
    // return locationData
    
}

const getTransporterData = async() => {
    return fetch("/get_transporter_data",{
        method: "POST",
        headers: {
            "x-access-token" : authService.authHeader()
        }
    })
     .then(response => { return response.json() })
     .then(myJson => { return myJson });    
}

const getComplaintData = async(flag) => {
    const id = authService.getCurrentUserPayload().id;
    return fetch("/get_complaint_data",{
        method: "POST",
        body: JSON.stringify({flag,id}),
        headers: {
            "x-access-token": authService.authHeader(),
            "Content-Type": "application/json"
        }
    })
     .then(response => { return response.json(); })
     .then(myJson => { return myJson });
}

const getComplaintDataAdmin = async (flag) => {
    return fetch("/get_complaint_data_admin",{
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



const obj = {
    getLocationData,
    getTransporterData,
    getComplaintData,
    getComplaintDataAdmin
}

export default obj;