import react from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../Home/Home";
import Products from "../../Products/Products/Products";
import AddProducts from "../../Products/AddProduct/AddProducts";
import EditProduct from "../../Products/EditProduct/EditProduct";
import Users from "../../Users/Users";

function Main():JSX.Element {

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home /> } />
                <Route path="/products" element={<Products /> } />
                <Route path="/add-products" element={<AddProducts /> } />
                <Route path="/edit-product/:id" element={<EditProduct /> } />
                <Route path="/users" element={<Users /> } />
                {/* <Route path="/users/:id" element={<Users /> } /> */}
            </Routes>
        </main>
    )

}
export default Main;