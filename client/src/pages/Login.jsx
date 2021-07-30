import React, { useState, Component } from 'react';
import {BrowserRouter as Router, Link, NavLink, Switch, Route, Redirect} from 'react-router-dom';


function Login(props){

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
    function changeUserId (e) {
        setUserId(e.target.value)
    }

    async function changeUserPassword (e) {
        setUserPassword(e.target.value)        
    }

    async function onLogin() {
        if (userId && userPassword) {
            const login = async () => {
                return fetch("/login_user", {
                    method: "POST",
                    body: JSON.stringify({ id: userId, password: userPassword }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                 .then(response => { return response.json(); })
                 .then(myJson => { return myJson });
            }
            const login_response = await login();
            
            if(login_response.error === null) {
                localStorage.setItem("user", JSON.stringify(login_response.data));
                props.history.push("/dashboard")              
            } else alert("Wrong Credentials!\nTry Again")
        } else alert("Enter Details!!!")        
    }
    return(
        <div class="w-screen h-screen flex justify-center items-center ">
		<div class="p-10 bg-blue-100 rounded flex justify-center items-center flex-col shadow-md" >
			<p class="mb-5 text-3xl uppercase text-blue-500">Login</p>
			<input onChange={changeUserId} type="text" name="email" class="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" autocomplete="off" placeholder="ID" required />
			<input onChange={changeUserPassword} type="password" name="password" class="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" autocomplete="off" placeholder="Password" required />
			<button onClick={onLogin} class="bg-blue-600 hover:bg-gray-700 text-gray-50 font-bold p-2 rounded w-80" id="login" type="submit"><span>Login</span></button>
		</div>
	</div>

        
    )
}

export default Login;