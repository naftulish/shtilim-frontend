import * as React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Main from "../Main/Main";
import Aside from "../Aside/Aside";
import "./Layout.css";
import { ReactNotifications } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'


export function Layout() {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const payloadJwt = jwtDecode(token);
    user = (payloadJwt as any).user;
  }
  if (!token) return <Navigate to="/login" />;

  // Add request and response interceptors
  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if (token) request.headers.Authorization = "Bearer " + token;
    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle 401 (Unauthorized) error - Redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="Layout">
      <Aside user={user} />
      <Main />
      <ReactNotifications />
    </div>
  );
}

export default Layout;
