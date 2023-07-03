import react from "react";
import { Routes, Route } from 'react-router-dom';
import Signup from "../../Settings/Signup/Signup";
import AddUser from "../../Settings/Users/AddUser";
import Users from "../../Settings/Users/Users";
import AddStudent from "../../Students/AddStudent";
import UpdateUser from "../../Settings/Users/UpdateUser";
import { Login } from "@mui/icons-material";
import Students from "../../Students/Students";
import UpdateStudent from "../../Students/UpdateStudent";
import StudentPlans from "../../Students/StudentPlans";
import Plans from "../../Plans/Plans";
import Groups from "../../Groups/Groups";
import AddGroup from "../../Groups/AddGroup";
import UpdateGroup from "../../Groups/UpdateGroup";


function Main():JSX.Element {

    return (
        <main>
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

                <Route path="/groups" element={<Groups /> } />
                <Route path="/addgroup" element={<AddGroup /> } />
                <Route path="/update-group/:id" element={<UpdateGroup /> } />
                
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