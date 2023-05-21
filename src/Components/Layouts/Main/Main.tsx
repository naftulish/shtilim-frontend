import react from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../Home/Home";
//import Products from "../../Products/Products/Products";
//import AddProducts from "../../Products/AddProduct/AddProducts";
//import EditProduct from "../../Products/EditProduct/EditProduct";
import Login from "../../Users/Login/Login";
import Signup from "../../Users/Signup/Signup";

function Main():JSX.Element {

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home /> } />
                {/* <Route path="/add-products" element={<AddProducts /> } /> */}
                {/* <Route path="/edit-product/:id" element={<EditProduct /> } /> */}
                <Route path="/login" element={<Login /> } />
                <Route path="/signup" element={<Signup /> } />
                {/* <Route path="/users/:id" element={<Users /> } /> */}
            </Routes>
        </main>
    )

}
export default Main;