import React,{useState, useRef} from "react";
import axios from "axios";

interface customer{
    type:string,
    name:string,
    email:string,
    phone:string,
    password:string,
    address:string[],
    companyName:string,
    idNo:string,
    businessType:string
}

const Registration=()=>{

    const[accout_type, setAccountType] = useState<String>("");
    const[customer_info, setCustomerInfo] = useState<customer>();
    // const[street, setStreet] = useState<String>();
    // const[city, setCity] = useState<String>();
    // const[country, setCountry] = useState<String>();
    // const[postcode, setPostcode] = useState<String>();

    const ref1 = useRef(null);

    const checkVendor=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setAccountType(e.target.value);
        setCustomerInfo({...customer_info,[e.target?.name]:e.target?.value})
    }

    const valupd=(e:React.ChangeEvent<HTMLInputElement>)=>{
        // if(e.target?.name == 'street'){
        //     setStreet(e.target?.value)
        //     setCustomerInfo({...customer_info,[e.target?.name]:e.target?.value})
        // } else if(e.target?.name == 'city'){
        //     setCity(e.target?.value)
        // } else if(e.target?.name == 'country'){
        //     setCountry(e.target?.value)
        // }else if(e.target?.name == 'postcode') {
            
        //     setPostcode(e.target?.value)
        // } else {
            setCustomerInfo({...customer_info,[e.target?.name]:e.target?.value})
        //}
    }

    const submitReg=(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault(); 
        
        axios.post('http://localhost:4000/mart/register',customer_info)
        .then((res)=>{
            console.log(res)
            if(res?.success) {
                if (ref1.current) {
                ref1.current.innerHTML = 'Registration Successfully';
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
                <div className="registration-container">
                    <div className="register-box">
                    <h2> CREATE AN ACCOUNT</h2>
                    <form action="#" onSubmit={submitReg} method="POST">

                        <div className="input-group" >
                            <label>Account Type</label>
                            <select name="type" onChange={checkVendor} required>
                                <option value="">Slect Account Type</option>
                                <option value="vendor">Seller</option>
                                <option value="user">Buyer</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label >Email Address</label>
                            <input type="email" id="email" name="email" placeholder="your@email.com" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label >Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="e.g. +91 9876543210" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" id="password" name="password" placeholder="Choose a strong password" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input type="password" id="confirm_password" name="confirm_password" placeholder="Choose a strong password" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>Street</label>
                            <input type="text" id="street" name="street" placeholder="Street" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>City</label>
                            <input type="text" id="city" name="city" placeholder="City" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>State</label>
                            <input type="text" id="state" name="state" placeholder="State" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>Country</label>
                            <input type="text" id="country" name="country" placeholder="Country" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>Postcode</label>
                            <input type="text" id="postcode" name="postcode" placeholder="Postcode" onChange={valupd} required />
                        </div>
                        {
                            (accout_type == 'vendor') ? 

                            <><div className="input-group">
                                <label>Company Name</label>
                                <input type="text" id="companyName" name="companyName" placeholder="Company Name" onChange={valupd} required />
                            </div>

                            <div className="input-group">
                                <label >ID Number</label>
                                <input type="email" id="idNo" name="idNo" placeholder="ID Number" onChange={valupd} required />
                            </div>

                            <div className="input-group">
                                <label >Business Type</label>
                                <input type="tel" id="businessType" name="businessType" placeholder="Business Type" onChange={valupd} required />
                            </div></> : ""

                        }
                        <div className="input-group">
                            <button type="submit">Register</button>
                        </div>
                        <div ref={ref1}></div>
                        <p className="login-link">Already have an account? <a href="/login">Login here</a></p>
                    </form>
                    </div>
                </div>
        </>
    )
}

export default Registration
