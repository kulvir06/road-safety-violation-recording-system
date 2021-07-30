import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, NavLink, Switch, Route, Redirect} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { LoginRoute } from './components/LoginRoute';
import { DashboardRoute } from './components/DashboardRoute';
import { AdminRoute } from './components/AdminRoute';
import Admin from './pages/Admin';
import ComplaintViewDashboard from './pages/Complaint-View-Dashboard';
import EditComplaint from './pages/Edit-Complaint';
import Report from './pages/Report';

function App() {
  return (
    <div>
      <Router>
      
      
      <Switch>
        <Route exact path="/register" component={Register}></Route>
        <LoginRoute exact path="/login" component={Login}></LoginRoute>
        <DashboardRoute path="/dashboard" component={Dashboard}></DashboardRoute>
        <AdminRoute path="/admin" component={Admin}></AdminRoute>
        <DashboardRoute path="/dashboard-view-complaints" component={ComplaintViewDashboard}></DashboardRoute>
        <AdminRoute path="/edit-complaint" component={EditComplaint}></AdminRoute>
        <DashboardRoute path="/report" component={Report}></DashboardRoute>

      </Switch>

      </Router>
             
    </div>
  );
}

export default App;
