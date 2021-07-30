import getData from '../services/getData';
import updateComplaint from '../services/editComplaint';
import React from 'react';

function EditComplaint(props) {
    let complaintId = {};
        
    const [newStatus, setNewStatus] = React.useState("");
    const [newRemarks, setNewRemarks] = React.useState("");
    const [items, setItems] = React.useState([{name: ""}])

    React.useEffect(()=>{        
       
       complaintId._id = localStorage.getItem("complaintId");
       localStorage.removeItem("complaintId")  
       getComplaint();            
    },[]);
    
    const editComplaint = async () => {
        if(newRemarks!=="" && newStatus!==""){
            let sendData = {
                _id: complaintId._id,
                remarks: newRemarks,
                status: newStatus
            };
            console.log(sendData);
            const flag = await updateComplaint(sendData);
            if(flag.message === true) { 
                alert("Complaint updated");
                props.history.push("/admin")
            }
            else alert("Some error occured\nPlease try again after sometime")
        } else alert ("enter all fields")
        

    }
    const getComplaint = async() => {
        const data = await getData.getComplaintDataAdmin(complaintId);   
        setItems(data);
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
        <div class="p-10 rounded flex justify-center items-center flex-col ">
        <div class="text-3xl uppercase text-blue-500" >Edit Complaint</div>
            <div>
                <div>  
                {items.map(item => (
                    <div class="space-y-4 space-x-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <div class="md:flex space-x-4">
                            <div class="p-8 space-x-4">

                            <p class="uppercase tracking-wide text-sm text-indigo-500 font-bold">
                            complaint Id = {complaintId._id = item._id} <br />
                            
                            </p>
                        <p class="mt-2 text-blue-500">
                            Reported By : {item.reportedBy} <br />
                            Description : {item.description} <br />
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
                            
                        </p>
                        </div>
                        </div>
                    </div>
                ))}
                
            </div>   
            <br />

            <input class="bg-blue-200 text-blue-500 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
             placeholder="ADD REMARKS" type="text" required onChange={e => setNewRemarks(e.target.value)}/> &nbsp;
              &nbsp;&nbsp;
            <select onChange={e => setNewStatus(e.target.value)} required
            class="bg-blue-200 text-blue-500 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none">
                <option value="" disabled selected>Choose a status</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
            </select>    &nbsp;&nbsp;&nbsp;
            <button class="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 border border-white rounded"
            type = "submit" onClick={editComplaint}>Edit Complaint</button>

            
                
            </div> <br />
            

        </div>
        </div>
    )
}

export default EditComplaint;