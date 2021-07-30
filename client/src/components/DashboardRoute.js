import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../services/authService';


export const DashboardRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.getCurrentUser();
        // console.log(currentUser);
        if (!currentUser) {
            alert("Login to view")
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)