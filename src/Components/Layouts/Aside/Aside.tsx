import react from "react";
import { NavLink } from 'react-router-dom';
import "./Aside.css"

function Aside():JSX.Element {

    return (
        <aside>
            <nav>
                <ul>
                    <li> <NavLink to='/'>Home</NavLink> </li>
                    <li> <NavLink to='/products'>Products</NavLink> </li>
                    <li> <NavLink to='/add-products'>Add Product</NavLink> </li>
                    <li> <NavLink to='/users'>Users</NavLink> </li>
                </ul>
            </nav>
        </aside>
    )

}
export default Aside;