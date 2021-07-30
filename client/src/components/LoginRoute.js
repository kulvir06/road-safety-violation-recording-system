import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../services/authService';


export const LoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.getCurrentUser();

        if (!currentUser) {
            return <Component {...props} />
            // not logged in so redirect to login page with the return url

        }

        // authorised so return component
        return <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />

    }} />
)