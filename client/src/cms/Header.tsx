import React from "react";

const Header=()=>{
    return(
        <>
             <header className="site-header">
                <div className="container header-top">
                <h1 className="logo">Moments<span>Mart</span></h1>
                <div className="search-box">
                    <input type="text" placeholder="Search for gifts, decor, fashion..." />
                    <button>🔍</button>
                </div>
                <nav className="top-menu">
                    <a href="/register">Sign Up</a>
                    <a href="/login">Sign In</a>
                    <a href="#">Cart 🛒</a>
                </nav>
                </div>
                <div className="main-nav container">
                    <a href="#">Home</a>
                    <a href="#">Diwali</a>
                    <a href="#">Gifts</a>
                    <a href="#">Decor</a>
                    <a href="#">Ethnic Wear</a>
                    <a href="#">Vendors</a>
                    <a href="#">Blog</a>
                </div>
            </header>
        </>
    )
}

export default Header