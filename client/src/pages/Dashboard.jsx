import React from 'react';
import authService from '../services/authService';
import uploadComplaint from '../services/uploadService';

import { storage } from '../firebase/index';
import getData from '../services/getData';



function Dashboard(props){
    
    const [locations, setLocations] = React.useState([{name: 'loading..'},{name: ''}])
    const [transporters, setTransporters] = React.useState([{name: 'loading..', id: ''}])   
    
    
    React.useEffect(() => {
        
        async function getDropdown(){
            
            const data1 = await getData.getLocationData();
            const data2 = await getData.getTransporterData();
            setLocations(data1); 
            setTransporters(data2)     
        }  
        getDropdown();                
    },[])

    
    const complaintData = {
        reportedBy: "",
        reportedDate: "",
        reportedLocation: "",
        description: "",
        vehicleNumber: "",
        transporterName: "",
        transporterCode: "",
        comments: "",
        imageUrl: []
    }

    let imageArray = [];
    
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


    const handleChange = (e) => {
        imageArray.push(e.target.files[0]);

        //preview image
        // let reader = new FileReader();
        // reader.onload = () => {
        //     let output = document.getElementById("output_image");
        //     output.height = 300;
        //     output.width = 300;
        //     output.title = e.target.files[0].name
        //     output.src = reader.result;
        // }
        // reader.readAsDataURL(e.target.files[0]);
        
    }

    const upload = async() => {
        let urlArray=[];
        imageArray.forEach(async image => {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);    
            uploadTask.on("state_changed", ()=>{}, (err)=>{ console.error(err); },
             async ()=>{
                let downloadUrl = storage.ref("images").child(image.name).getDownloadURL();
                let url = await downloadUrl;
                return resolve(url);
             }
            )        
        });
        const resolve = async (x)=> {
            urlArray.push(x)
            if(urlArray.length === imageArray.length){
                complaintData.imageUrl = urlArray;
                const flag = await uploadComplaint(complaintData); 
                if(flag.message===true) alert("Complaint Registered");
                else alert("Complaint failed to register");                              
            }
        }
    }

    const handleClick =  async () => {
        const getAuthorizationStatus = await authService.validateUser();
        if(getAuthorizationStatus.message !== "OK") {
            alert("Session Expired! Please ReLogin")
            logout();
        } else if(complaintData.description===""||complaintData.comments===""||complaintData.reportedLocation===""||complaintData.vehicleNumber===""||imageArray.length===0){
            alert("Fill in all required fields")
        }else {            
            complaintData.reportedBy = await authService.getCurrentUserPayload().id;
            complaintData.reportedDate = new Date();
            await upload();  
        }
        
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

    return(
            
            <div class="min-h-screen flex flex-row bg-blue-50">
  <div class="flex flex-col w-56 bg-blue-500 rounded-r-3xl overflow-hidden shadow-2xl">
    <div class="flex items-center justify-center h-20 shadow-2xl bg-gray-50">
      <h1 class="text-3xl uppercase text-blue-500">WELCOME</h1>
    </div>
    <ul class="flex flex-col py-4">
    <li>
        <button onClick={()=>{props.history.push('/dashboard')}} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-white"><i class="bx bx-home"></i></span>
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
<div class="p-20  rounded flex justify-center items-center flex-col">
    <p class="mb-4 text-3xl uppercase text-blue-500">Register Complaint : </p>
<br />
            <form>
                <select class="bg-blue-200 text-blue-500 mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" required onChange={(e) => complaintData.reportedLocation = e.target.value }>
                 <option value="" disabled selected>Reported Location</option>
                     {
                        
                        Object.entries(locations).map( ele => (
                            <option key={ele.name} value={ele[1].name}>{ele[1].name}</option>
                        ))
                                     
                    }
                </select>
                <br /><br />
                
                <input type="text" placeholder="Description" required onChange={
                    (e) => complaintData.description = e.target.value
                } class="bg-blue-200 placeholder-blue-500 text-blue-500 mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"/> <br /><br />

                <input type="text" placeholder="Vehicle Number" required onChange={
                    (e) => complaintData.vehicleNumber = e.target.value
                } class="bg-blue-200 placeholder-blue-500 text-blue-500 mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"/> <br /><br />

                <select class="bg-blue-200 placeholder-blue-500 text-blue-500 mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" onChange={(e) => {
                    let str = e.target.value;
                    complaintData.transporterName = str.substring(0,str.lastIndexOf("-"));
                    complaintData.transporterCode = str.substring(str.lastIndexOf("-")+1);
                } }>
                    <option value="" disabled selected>Transporter name-id</option>
                    <option value="">NIL</option>
                    {                        
                        Object.entries(transporters).map( ele => (
                            
                        <option key={ele.name} value={ele[1].name + "-" + ele[1].id}>{ele[1].name + "-" + ele[1].id}</option>
                    ))}
                </select>

                <br /><br />
                <input type="text" placeholder="comments" required onChange={
                    (e) => complaintData.comments = e.target.value
                } class="bg-blue-200 placeholder-blue-500 text-blue-500 mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"/><br /><br />
                
                <input id="file-input" type="file" accept="image/*" multiple onChange={handleChange} required class="bg-blue-200 mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none placeholder-blue-500 text-blue-500"/>
                {/* <img id="output_image" /> */}
            </form>
            <br />
            <button 
            class="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 border border-white rounded"
            onClick={handleClick}>Upload</button> 
            <br /> <br />
</div>
</div>
    )    

}

export default Dashboard;











