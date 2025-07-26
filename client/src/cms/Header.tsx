import React, {useState, useEffect, useRef } from "react";
import axios from "axios";
import {Link,NavLink} from "react-router-dom";

const Header=()=>{
    const[menu, setMenu] = useState<any>();
    const refMenu = useRef(null);
 
    useEffect(()=>{
        axios.get('http://localhost:4000/mart/categories')
        .then((res)=>{
            console.log(res)
            if(res?.data?.success) {
                setMenu(res?.data?.data);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const toggleNav=()=>{
            refMenu.current.classList.toggle("show");   
    }

    return(
        <>
             <header className="site-header">
                <div className="container header-top">
                <a href="/" className="log-cls"><h1 className="logo">Moments<span>Mart</span></h1></a>
                <div className="search-box">
                    <input type="text" placeholder="Search for gifts, decor, fashion..." />
                    <button>Search</button>
                </div>
                <nav className="top-menu user-actions">
                    <a href="/register" className="action-link"><i className="fas fa-user-plus"></i></a>
                    <a href="/login" className="action-link"><i className="fas fa-user"></i></a>
                    <a href="#" className="action-link cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </a>
                </nav>
                </div>
                <button className="nav-toggle" onClick={toggleNav}>☰ Categories</button>
                <div className="main-nav-wrapper" ref={refMenu}>
                    <div className="main-nav container">
                        <NavLink to="/" key="home" style={({isActive})=>({color:isActive?'#fff':'#1E1E2E',backgroundColor:isActive?'#DC143C':'#FFD93D'})}>Home</NavLink>
                        {
                            (menu && menu.length > 0) ?
                                (
                                    menu.map((category:any)=>{
                                        return <NavLink to={`/category/${category._id}`} key={category._id} style={({isActive})=>({color:isActive?'#fff':'#1E1E2E',backgroundColor:isActive?'#DC143C':'#FFD93D'})}>{category.name}</NavLink>
                                    })
                                ):null
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header