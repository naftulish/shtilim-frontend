import "./Aside.css"
import React from 'react'
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from 'react-router-dom';
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../../../Assets/logo.png";
import logokivun from "../../../Assets/logo_kivun.png";
import HomeIcon from '@mui/icons-material/Home';
import { SchoolRounded } from "@mui/icons-material";
import IUserModel from '../../../Models/IUserModel';


interface AsideProps{
    user: IUserModel
}

function Aside( props: AsideProps ) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const menu = [
        { text: 'ראשי', path: '/', icon: <HomeIcon /> },
        { text: 'תלמידים', path: '/students', icon: <SchoolRounded /> },
        { text: 'כיתות', path: '/groups', icon: <GroupsIcon /> },
        { text: 'תוכניות', path: '/plans', icon: <AssignmentIcon /> },
        { text: 'הגדרות', path: '/users', icon: <SettingsIcon /> },
    ]

    return (
        <div className='Aside'>
            
            <div>
                <NavLink to="/">
                    <img className="AsideLogo" src={logo} alt="" />
                </NavLink>
                <div className="AsideList">
                    { menu.map(item  => <NavLink key={item.path} to={item.path}>{item.icon} { item.text }</NavLink> )}
                </div>
            </div>

            <div className="credit">
                <div className="user"> {props?.user?.firstName} {props?.user?.lastName} </div>
                <Button className="btn-second" variant="contained" onClick={logout}>התנתקות</Button>
                <div>
                    <span>פותח בשיתוף</span>
                    <img src={logokivun} alt="" />
                </div>
                <span>Version 1.0.0</span>
            </div>
          </div>
    )
}

export default Aside