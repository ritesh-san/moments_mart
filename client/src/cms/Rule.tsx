import React from "react";
import {Link, BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Registration from "../customer/Registration";
import Login from "../customer/Login";
import Dashboard from "../customer/Dashboard";

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
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default Rule