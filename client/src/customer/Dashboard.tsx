import React,{useState, useLayoutEffect} from "react";
import Menu from "./Menu";
import { useNavigate, Outlet, useLocation  } from "react-router-dom";

const Dashboard=()=>{
    const[user, setUser] = useState<any>()

    const nav=useNavigate();

     const location = useLocation();

  const isRootAccountPage = location.pathname === '/account';

    useLayoutEffect(()=>{
        console.log(JSON.parse(sessionStorage.getItem('customer')));
        setUser(JSON.parse(sessionStorage.getItem('customer')));
    },[])

    
    return(
        <>
        {
            
            (user) ?
            <div className="dashboard-container">
                <Menu/>
                {
                isRootAccountPage ? (
                <main className="main-content">
                <h1>Welcome, {user.name}</h1>
                <div className="content-box">
                    <p>This is your account dashboard. From here, you can manage your personal info, password, and other settings.</p>
                </div>
                </main>
                            ) : <Outlet />
                        }
            </div> : null

        }
        </>
    )
}

export default Dashboard