import react from "react";
import { Routes, Route } from 'react-router-dom';
import Signup from "../../Settings/Signup/Signup";
import AddUser from "../../Settings/Users/AddUser";
import Users from "../../Settings/Users/Users";
import AddStudent from "../../Students/AddStudent";
import UpdateUser from "../../Settings/Users/UpdateUser";
import Login from "../../Settings/Login/Login";
import Students from "../../Students/Students";
import UpdateStudent from "../../Students/UpdateStudent";
import StudentPlans from "../../Activities/StudentPlans";

import Groups from "../../Groups/Groups";
import AddGroup from "../../Groups/AddGroup";
import UpdateGroup from "../../Groups/UpdateGroup";
import Plans from "../../Plans/Plans/Plans";
import AddPlan from "../../Plans/AddPlan/AddPlan";
import './Main.css'; 



function Main():JSX.Element {

    return (
        <main className="main">
            <Routes>
                <Route path="/login" element={<Login /> } />
                <Route path="/signup" element={<Signup /> } />
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
                {/* https://trello.com/1/cards/64a132fc58f839254c9b4cd7/attachments/64aa6700a2ea39169bb0cc99/download/%D7%9C%D7%95%D7%92%D7%95_%D7%A9%D7%AA%D7%99%D7%9C%D7%99%D7%9D_%D7%A8%D7%A7%D7%A2_%D7%A9%D7%A7%D7%95%D7%A3.png */}
                
            </Routes>
        </main>
    )

}
export default Main;

{/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/students" element={<Students />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/update-student/:id" element={<UpdateStudent />} />
        <Route path="/plans" element={<Plans />} />
        {currentUserRole === Role.admin && (
          <>
            <PrivateRoute
              path="/users"
              element={<Users />}
              userRole={currentUserRole}
            />
            <PrivateRoute
              path="/adduser"
              element={<AddUser />}
              userRole={currentUserRole}
            />
            <PrivateRoute
              path="/update-user/:id"
              element={<UpdateUser />}
              userRole={currentUserRole}
            />
          </>
        )}
      </Routes> */}


  