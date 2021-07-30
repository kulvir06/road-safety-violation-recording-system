import React from 'react';
import getData from '../services/getData';
import authService from '../services/authService';

function Admin(props){
    let query = {};  
    let counter = 0;
    const [locations, setLocations] = React.useState([{name: 'loading..'},{name: ''}]) 
    const [items, setItems] = React.useState([{name: ""}])

    React.useEffect(() => {
        async function getDropdown(){
            const data1 = await getData.getLocationData();
            setLocations(data1);
        }
        getDropdown();
    },[]);

    const viewComplaintsOnClick = async () => {
        const getAuthorizationStatus = await authService.validateUser();
        if(getAuthorizationStatus.message !== "OK") {
            alert("Session Expired! Please ReLogin")
            logout();
        } else {
            props.history.push("/dashboard-view-complaints")
        }
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
       
    const handleClick = async () => {
        await authorize();
        const data = await getData.getComplaintDataAdmin(query);
        if(data.length===0){ alert("no complaints found"); window.location.reload();}
        else setItems(data)
              
    }
    const url = (x) => {   
        let y = JSON.stringify(x) ;   
        let z = String(y)
        let w = z.split('"');
        let arr = [];
        for(let i=0;i<w.length;i++){
            if(i%2===1) { arr.push({j:w[i]}); }
        }    
        let urlCounter = 1;        
                            
        return (
            <div>
                {arr.map(ele => (
                    <a class="no-underline hover:underline text-red-500" href={ele.j}>Link {urlCounter++}<br/></a>                    
                    // <img src={ele.j} alt="" width="100" height="100"/>                    
                ))}
                
            </div>
        )
    }
    const checkStatus = (x,y) => {
        if(x==="OPEN") {
            return (
                <div class="bg-yellow-200 border rounded">
                    <p class="text--500 font-semibold">
                    &nbsp; Status : {x} <br />
                    &nbsp;&nbsp;Remarks : {y}
                    </p>
                </div>
            )
        }
        else {
            return(
                <div class="bg-green-200 border rounded">
                    <p class="text-gr00 font-semibold">
                        &nbsp; Status : {x} <br />
                        &nbsp;&nbsp;Remarks : {y}
                    </p>
                </div>
            )
        }

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
<div class="p-10 rounded flex justify-center items-center flex-col ">
<div class="mb-4 text-3xl uppercase text-blue-500" >ADMIN</div>
            <p>Search and Edit Complaints</p>
            <br /> 
            <input class="bg-blue-200 text-blue-500 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
            type="text" placeholder="Search by ID" onChange={e=>query.reportedBy = (e.target.value)}/>
           <br />
           
            <select class="bg-blue-200 text-blue-500 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
            onChange={e => query.reportedLocation = (e.target.value)}>
                <option value="" disabled selected>Choose a location</option>
                <option value="" >ANY</option>
                {
                    Object.entries(locations).map( ele => (
                        <option value={ele[1].name}>{ele[1].name}</option>
                    ))
                }
            </select>                            

            <br />

            <select class="bg-blue-200 text-blue-500 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
            onChange={e=>query.status = (e.target.value)}>
                <option value="" disabled selected>Choose a Complaint Status</option>
                <option value="" >ANY</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
            </select>
            <br />

            <button class="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 border border-white rounded"
            type="submit" onClick={handleClick}>Go</button>  
            <br /><br />
            
            <div>
                {items.map(item => (
                    <div class="space-y-4 space-x-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <div class="md:flex space-x-4">
                            <div class="p-8 space-x-4">
                                
                            
                        <p class="uppercase tracking-wide text-sm text-blue-700 font-semibold">
                        Complaint {++counter}:
                        </p>
                        <p class="mt-2 text-blue-500">
                            Complaint ID : {item._id}  <br />
                            Reported By : {item.reportedBy} <br />
                            Description : {item.description} <br />
                            {/* Image Url : <a href={item.imageUrl}>url</a> <br /> */}
                            Reported Location : {item.reportedLocation} <br />
                            Vehicle Number : {item.vehicleNumber} <br />
                            Transporter Name <i>(optional)</i> : {item.transporterName} <br />
                            Transporter Code <i>(optional)</i> : {item.transporterCode} <br />
                            Created On : {item.createdOn} <br />
                            Comments : {item.comments} <br />
                            Image URLs : <br/>
                            {url(item.imageUrl)}
                            
                            {
                                checkStatus(item.status,item.remarks)
                            }
                            <br /> 
                            <button class="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 border border-white rounded"
                            onClick={() => {if(typeof(item._id)!=="undefined"){localStorage.setItem("complaintId",item._id); props.history.push("/edit-complaint")}}}>Edit Complaint</button> <br /> <br />
                            
                            
                        </p>
                        </div>
                        </div>
                    </div>
                ))}
            </div>   
    
</div>
</div>
        
        
    )
}

export default Admin;