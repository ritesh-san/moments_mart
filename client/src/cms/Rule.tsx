import React from "react";
import {Link, BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Registration from "../customer/Registration";
import Login from "../customer/Login";
import Dashboard from "../customer/Dashboard";
import Productupload from "../Catalog/Productupload";
import Product from "../Catalog/Product";
import CategoryDetails from "../Catalog/Category";
import ProductList from "../Catalog/ProductList";
import ProductsDeatils from "../Catalog/ProductDeatils";
import Cart from "../Checkout/Cart";
import Payment from "../Checkout/Payment";
import Success from "../Checkout/Success";
import Order from "../Order/Orderdetails";

const Rule=()=>{
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Registration/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/account" element={<Dashboard/>}>
                     
                    </Route>
                    <Route path="/product" element={<Product/>}>
                        <Route path="upload" element={<Productupload/>} />
                          <Route path="list" element={<ProductList />} />
                    </Route>
                    <Route path="/category/:id" element={<CategoryDetails/>} />
                    <Route path="/item/:id" element={<ProductsDeatils/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/checkout" element={<Payment/>} />
                    <Route path="/success" element={<Success/>} />
                    <Route path="/order" element={<Order/>} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default Rule