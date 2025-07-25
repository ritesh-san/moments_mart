import React from "react";

const Header=()=>{
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