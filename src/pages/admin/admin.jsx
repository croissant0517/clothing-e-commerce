import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import {message} from 'antd';

import AdminDashboard from "../../components/admin-components/admin-dashboard/admin-dashboard";
import AdminSignIn from "../../components/admin-components/admin-sign-in/admin-sign-in";

import 'antd/dist/antd.css';
import "./admin.scss";

import { API_URL } from "../../api/api-utils";

const AdminPage = (props) => {
  const [ currentAdmin, setCurrentAdmin ] = useState({})

  const handleRedirect = () => (currentAdmin.name)? <Redirect to={`${props.match.path}/dashboard`} /> : <Redirect to={`${props.match.path}/signin`} />

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios({
        method: "POST",
        url: `${API_URL}/admin/signin`,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token,
        },
      })
      .then((res) => {
          if (res.data.id && res.data) {
              setCurrentAdmin(res.data)
          }
      })
      .catch((error) => {
        message.error("please sing in")
      })
    }
  }, [])
  
  return (
    <div className="admin-page-container" >
      <Route path = {`${props.match.path}`} render={handleRedirect}/>
      <Route path = {`${props.match.path}/dashboard`} render={({ match, history }) => <AdminDashboard match={match} history={history} currentAdmin={currentAdmin}/>} />
      <Route path = {`${props.match.path}/signin`} render={() => <AdminSignIn setCurrentAdmin={setCurrentAdmin}/>} />
    </div>
  )
}

export default AdminPage;