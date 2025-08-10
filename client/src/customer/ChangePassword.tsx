import React,{useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () =>{
    const [oldpass, setOldPass] = useState<string>()
    const [newpass, setNewpass] = useState<string>()
    const [confirmpass, setConfirmPass] = useState<string>()
    const [customer, setCustomer] = useState<any>(JSON.parse(sessionStorage.getItem('customer')))

    const setval = (e:React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value);
        if(e.target.name == 'currentPassword') {
            setOldPass(e.target.value)
        } else if(e.target.name == 'newPassword') {
            setNewpass(e.target.value)
        }  else if(e.target.name == 'confirmPassword') {
            setConfirmPass(e.target.value)
        }
    }

    const changepass = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        //console.log(oldpass);
        if(newpass != confirmpass) {
            toast.error("New Password and Confirm Password are dose not match");
        } else {
            let login_info = {
                email: customer.email,
                password: oldpass
            }
            axios.post('http://localhost:4000/mart/login',login_info)
            .then((res)=>{
                console.log(res)
                if(res?.data.success == true) {
                    let change_password = {
                        customerid: customer._id,
                        password: newpass
                    }
                    axios.post('http://localhost:4000/mart/changepass',change_password)
                    .then((res)=>{
                        console.log(res)
                        if(res?.data.success) {
                            toast.success("Password Change Successfully");
                            
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    
                } else {
                    toast.error("Current password not Match");
                }
            })
            .catch((err)=>{
                console.log(err)
                toast.error(err.response.data.msg);
            })
        }
    }

    return(
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="form-wrapper">
                <main className="main-content product-upload-container">
                <h2>Change Password</h2>
                <form onSubmit={changepass} method="post" >
                        <label >Current Password</label>
                        <input type="password" onChange={setval}  name="currentPassword" placeholder="Enter current password" required/>
                    
                        <label >New Password</label>
                        <input type="password" onChange={setval}  name="newPassword" placeholder="Enter new password" required/>
                    
                        <label >Confirm New Password</label>
                        <input type="password" onChange={setval} name="confirmPassword" placeholder="Confirm new password" required/>
                    
                    <button type="submit">Update Password</button>
                    <p className="note">Make sure your new password is at least 8 characters long.</p>
                </form>
            </main>
            </div>
        </>
    )
}

export default ChangePassword