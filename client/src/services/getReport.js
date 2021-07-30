import authService from "./authService";

const getReportData = (flag) => {
    return fetch("/report",{
        method: "POST",
        body: JSON.stringify(flag),
        headers: {
            "Content-Type": "application/json",
            "x-access-token" : authService.authHeader()
        }
    })
     .then(response => { return response.json() })
     .then(myJson => { return myJson });
}

const obj = {
    getReportData
}

export default obj;