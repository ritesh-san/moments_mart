import React from "react";
import Menu from "../customer/Menu";
import { Outlet } from "react-router-dom";

const Product=()=>{
    return(
        <>
            <div className="dashboard-container">
                <Menu/>
                <Outlet/>
            </div>
        
        </>
    )
}

export default Product