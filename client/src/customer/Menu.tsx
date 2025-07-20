import React from "react";
import { useNavigate } from "react-router-dom";

const Menu=()=>{

    const nav=useNavigate();

    const logout=()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('customer')

        nav('/')
    }

    return(
        <>
            <aside className="sidebar">
                <h2>My Account</h2>
                <ul className="sidebar-menu">
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Change Password</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Address Book</a></li>
                    <li><a href="#" onClick={logout}>Logout</a></li>
                </ul>
                </aside>
        </>
    )
}

export default Menu