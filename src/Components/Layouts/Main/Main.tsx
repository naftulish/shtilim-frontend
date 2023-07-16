import react from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import AddUser from "../../Settings/Users/AddUser";
import Users from "../../Settings/Users/Users";
import AddStudent from "../../Students/AddStudent";
import UpdateUser from "../../Settings/Users/UpdateUser";

import Students from "../../Students/Students";
import UpdateStudent from "../../Students/UpdateStudent";
import StudentPlans from "../../Activities/StudentPlans";

import Groups from "../../Groups/Groups";
import AddGroup from "../../Groups/AddGroup";
import UpdateGroup from "../../Groups/UpdateGroup";
import Plans from "../../Plans/Plans/Plans";
import AddPlan from "../../Plans/AddPlan/AddPlan";
import './Main.css'; 
import { Home } from "@mui/icons-material";



function Main():JSX.Element {

    return (
        <main className="main">
            <Routes>
                
                <Route path="/home" element={<Navigate to = "/" /> } />
                <Route path="/users" element={<Users /> } />
                <Route path="/adduser" element={<AddUser /> } />
                <Route path="/update-user/:id" element={<UpdateUser /> } />

                <Route path="/students" element={<Students /> } />
                <Route path="/update-student/:id" element={<UpdateStudent /> } />
                <Route path="/addstudent" element={<AddStudent /> } />
                <Route path="/student-plans/:id" element={<StudentPlans />} />

                <Route path="/plans" element={<Plans /> } />
                <Route path="/addplan" element={<AddPlan /> } />


                <Route path="/groups" element={<Groups /> } />
                <Route path="/addgroup" element={<AddGroup /> } />
                <Route path="/update-group/:id" element={<UpdateGroup /> } />
                
            </Routes>
        </main>
    )

}
export default Main;




  