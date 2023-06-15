import react from "react";
import { NavLink } from 'react-router-dom';
import "./Aside.css"

function Aside():JSX.Element {

    return (
        <aside>
            <nav>
                <ul>
                    <li> <NavLink to='/'>Home</NavLink> </li>
                    <li> <NavLink to='/users'>Users</NavLink> </li>
                    <li> <NavLink to='/adduser'>Add User</NavLink> </li>
                </ul>
            </nav>
        </aside>
    )

}
export default Aside;