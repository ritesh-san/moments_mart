import React,{useState} from "react";
import { useNavigate,Link,NavLink } from "react-router-dom";

const Menu=()=>{

    const nav=useNavigate();
    const[customer, setCustomer] = useState<any>(JSON.parse(sessionStorage.getItem('customer')));
   

    const logout=()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('customer')
        sessionStorage.removeItem('cart')

        nav('/')
    }

    return(
        <>
            <aside className="sidebar">
                <h2>My Account</h2>
                <ul className="sidebar-menu">
                    <li><NavLink to="/account" key="account" style={({isActive})=>({color:isActive?'#FFD93D':'#fff'})}>Profile</NavLink></li>
                    <li><NavLink to="/account/changepass" key="password" style={({isActive})=>({color:isActive?'#FFD93D':'#fff'})}>Change Password</NavLink></li>
                    <li><NavLink to="/account/orders" key="orders" style={({isActive})=>({color:isActive?'#FFD93D':'#fff'})}>Orders</NavLink></li>
                    <li><NavLink to="/account/address" key="address" style={({isActive})=>({color:isActive?'#FFD93D':'#fff'})}>Address Book</NavLink></li>
                    {
                        customer?.type === 'vendor' ? (
                        <>
                            {/* <li><NavLink to="/product/upload" key="upload" style={({isActive})=>({color:isActive?'#FFD93D':'#fff'})}>Upload Product</NavLink></li> */}
                            <li><NavLink to="/product/list" key="list" style={({isActive})=>({color:isActive?'#FFD93D':'#fff'})}>Products</NavLink></li>
                        </>
                    ) : null
                    }
                    
                    <li><a href="#" onClick={logout} >Logout</a></li>
                </ul>
                </aside>
        </>
    )
}

export default Menu