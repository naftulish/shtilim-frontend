import * as React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Main from "../Main/Main";
import Aside from "../Aside/Aside";
import "./Layout.css";


export function Layout() {
  
    const token = localStorage.getItem("token");
    let user = null;
    if(token){
      const payloadjJwt = jwtDecode(token);
      user = (payloadjJwt as any).user;
    }
    if(!token) return <Navigate to='/login' />;
    
    axios.interceptors.request.use(request => {
      const token = localStorage.getItem("token");
      if (token) request.headers.Authorization =  "Bearer " + token ;
      return request; 
    });

    return (
      <div className="Layout">
          <Aside user={user}/>
          <Main />
      </div>
    );
}

export default Layout;
