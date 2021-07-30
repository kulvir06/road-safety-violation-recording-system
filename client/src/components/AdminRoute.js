import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../services/authService';


export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.getCurrentUser();


        
        if (!currentUser) {
            alert("Login to view")

            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        else {
            let currentUserRole = authService.getCurrentUserPayload().type;
            if(currentUserRole !== "ADMIN") {
                alert("Only admins can view")
                return <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
            } else  // authorised so return component
            return <Component {...props} />            
        }
       
    }} />
)