import react from "react";
import { Routes, Route } from 'react-router-dom';

//import Products from "../../Products/Products/Products";
//import AddProducts from "../../Products/AddProduct/AddProducts";
//import EditProduct from "../../Products/EditProduct/EditProduct";

import Signup from "../../Settings/Users/Signup/Signup";
import AddUser from "../../Settings/Users/AddUser";
import Users from "../../Settings/Users/Users";
import NewStudent from "../../Students/NewStudent/NewStudent";
import UpdateUser from "../../Settings/Users/UpdateUser";
import { Login } from "@mui/icons-material";

function Main():JSX.Element {

    return (
        <main>
            <Routes>
                
                <Route path="/login" element={<Login /> } />
                <Route path="/signup" element={<Signup /> } />
                <Route path="/users" element={<Users /> } />
                <Route path="/adduser" element={<AddUser /> } />
                <Route path="/update-user/:id" element={<UpdateUser /> } />
                <Route path="/addstudent" element={<NewStudent /> } />
                {/* <Route path="/users/:id" element={<Users /> } /> */}
            </Routes>
        </main>
    )

}
export default Main;