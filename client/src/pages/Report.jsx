import React from "react";
import getData from "../services/getReport";
import { CSVLink } from 'react-csv';
import authService from "../services/authService";

function Report(props) {
    const [fromDate,setFromDate] = React.useState("");
    const [toDate,setToDate] = React.useState("");
    const [data, setData] = React.useState([]);

    const headers = [
        { label: "Created On", key: "createdOn"},
        { label: "Status", key: "status"},
        { label: "Remarks", key: "remarks"},
        { label: "Reported By", key: "reportedBy"},
        { label: "Reported Location", key: "reportedLocation"},
        { label: "Description", key: "description"},
        { label: "Vehicle Number", key: "vehicleNumber"},
        { label: "Transporter Name", key: "transporterName"},
        { label: "Transporter Code", key: "transporterCode"},
        { label: "Comments", key: "comments"}
    ];

    const csvReport = {
        data: data,
        headers: headers,
        filename: "Report.csv"
    }
    
    const authorize = async() => {
        const getAuthorizationStatus = await authService.validateUser();        
        if(getAuthorizationStatus.message === "OK"){
            const role = await authService.getCurrentUserPayload().type;
            if(role === "VIEWER") alert("ONLY ADMINS CAN ACCESS");
            else props.history.push("/admin")  
        } else{
            alert("Session Expired!\nRe-Login");
            logout();
        }    
    }   

    const logout = () => {
        authService.logoutUser();
        props.history.push("/login")
    }

    const viewComplaintsOnClick = async () => {
        const getAuthorizationStatus = await authService.validateUser();
        if(getAuthorizationStatus.message !== "OK") {
            alert("Session Expired! Please ReLogin")
            logout();
        } else {
            props.history.push("/dashboard-view-complaints")
        }
    }

    const checkFunction = () => {

        if(data.length!==0) {
            return (
                <div>
                    <br />
                    <CSVLink {...csvReport} class="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 border border-white rounded">Download Report</CSVLink>
                </div>
            )
        }     
    }    

    
    const getReport = async() => {        
        const complaints = await getData.getReportData({from: fromDate, to: toDate});  
        console.log(complaints); 
        if(complaints.length===0) alert("check the dates entered") 
        else alert("Report generated. Download the report by clicking the link")
        setData(complaints);                           
    }

    return(
        <div class="min-h-screen flex flex-row bg-blue-50">
  <div class="flex flex-col w-56 bg-blue-500 rounded-r-3xl overflow-hidden shadow-2xl">
    <div class="flex items-center justify-center h-20 shadow-2xl bg-gray-50">
      <h1 class="text-3xl uppercase text-blue-500">WELCOME</h1>
    </div>
    <ul class="flex flex-col py-4">
    <li>
        <button onClick={()=>{props.history.push('/dashboard')}} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
          <span class="text-sm font-medium text-gray-50">Dashboard</span>
        </button>
      </li>
      <li>
        <button onClick={viewComplaintsOnClick} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
          <span class="text-sm font-medium text-gray-50">View Complaints</span>
        </button>
      </li>
      <li>
        <button onClick={() => props.history.push("/report")} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
          <span class="text-sm font-medium text-gray-50">Report</span>
        </button>
      </li>
      
      <li>
        <button onClick={authorize} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-shopping-bag"></i></span>
          <span class="text-sm font-medium text-gray-50">Admin</span>
        </button>
      </li>
      <li>
        <button onClick={logout} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-chat"></i></span>
          <span class="text-sm font-medium text-gray-50">Logout</span>
        </button>
      </li>
    </ul>
    
  </div>
<div class="p-20  rounded flex justify-center items-center flex-col ">
<div>
<div class="mb-4 text-3xl uppercase text-blue-500" >report</div>
            
            <br />
            Complaint Logged Date Range <br /><br />
            From: &nbsp;<input type="date"  onChange={(e) => setFromDate(e.target.value)} class="text-blue-500 bg-blue-200 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"/> <br /><br />
            To: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" onChange={(e) => setToDate(e.target.value)} class="text-blue-500 bg-blue-200 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"/>
            <br /><br />
            <button class="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 border border-white rounded" onClick={getReport}>Generate Report</button>
            {checkFunction()}
            <br /><br />


            
        </div>
   
</div>
</div>
        
    )

}

export default Report;