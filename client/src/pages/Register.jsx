import React, { useState, Component } from 'react';
import bcrypt from 'bcryptjs';


function Register(props){

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [key, setKey] = useState("");
    
    function changeUserId (e) {
        setUserId(e.target.value)
    }

    async function changeUserPassword (e) {
        await bcrypt.hash(e.target.value, 10, (err, hash) => {
            if(err) alert(err);
            setUserPassword(hash);
        })          
    }

    function changeKey (e) {
      setKey(e.target.value)
  }

    async function onRegister(){
      if (userId && userPassword) {
        let type = "";
        if(key==="admin123") type = "ADMIN";
        else if(!key) type = "VIEWER" 
        else {
          alert("Wrong Admin key");
          // throw new Error("WRONG ADMIN KEY ENTERED");
          return;
        }

        const register = async () => {
          const RESULT = await fetch("/create_new_user", {
              method: "POST",
              body: JSON.stringify({ id: userId, password: userPassword, type: type }),
              headers: {
                  "Content-Type": "application/json"
              }
          })
           .then(response => { return response.json(); })
           .then(myJson => { return myJson });
          return(RESULT.flag);
        }
          if(await register()) {
            alert("User Created!");
            props.history.push("/login")
          }
          else alert("User already exists!")
      } else alert("Enter Details!!")
        
    }

    return(
      <div>
        <h2>Register...</h2>

        <p>
          <label>ID : <input type="text" name="id" onChange={changeUserId} required></input></label>
        </p>
        <p>
          <label>Password : <input type="password" name="password" onChange={changeUserPassword} required></input></label>
        </p>
        <p>
          <label>ADMIN Account Key : <input type="password" name="password" onChange={changeKey} required></input></label>
        </p>
        <button onClick={onRegister}>Register</button>
        
        
      </div>
    )
}

export default Register;