import React,{useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

const AddressEdit=()=>{

    const[street, setStreet] = useState<string>('')
    const[city, setCity] = useState<string>('')
    const[state, setState] = useState<string>('')
    const[country, setCountry] = useState<string>('')
    const[postcode, setPostcode] = useState<string>('')

    const[address, setAddress] = useState<string>('')

    const {id} = useParams();

    const nav = useNavigate();

    useEffect(()=>{
        let customer = JSON.parse(sessionStorage.getItem('customer'))
        axios.get(`http://localhost:4000/mart/address/${customer._id}/${id}`)
        .then((res)=>{
            console.log(res.data.data)
            let addressnew = res.data.data
            setAddress(addressnew)
            setStreet(addressnew?.street || "")
            setCity(addressnew?.city  || "")
            setState(addressnew?.state || "")
            setCountry(addressnew?.country || "")
            setPostcode(addressnew?.postcode || "")
        }).catch((err)=>{
            console.log(err)
            toast.error("Something went wrong!");
        })
    },[])

    const handleSubmit=async (e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const customer = JSON.parse(sessionStorage.getItem("customer") || "{}");
        if (!customer._id) {
            
            toast.success(`Customer not found. Please login again.`);
            return;
        }

       let addressnew = {
        street: street,
        city: city,
        state: state,
        country: country,
        postcode: postcode,
        customerid: customer._id,
        addressid: id? id:''
       }

        try {
            const res = await axios.post('http://localhost:4000/mart/address', addressnew);
            console.log('Uploaded:', res.data);
            toast.success(`Address save successfully`);
            setStreet('')
            setCity('')
            setState('')
            setCountry('')
            setPostcode('')
            nav('/account/address')
            
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong!");
        }
    }

    return(
        <>
        <ToastContainer position="top-right" autoClose={3000} />
            <div className="form-wrapper">
                <main className="main-content product-upload-container">
                    <h2>Add Address</h2>
                    <form action="/upload-product" onSubmit={handleSubmit} method="POST" >
                        

                        <label>Street</label>
                        <input type="text" name="street" value={street} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setStreet(e.target.value)} placeholder="Enter Street" required/>

                        <label>City</label>
                        <input type="text" name="city" value={city} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setCity(e.target.value)} placeholder="Enter City" required/>

                        <label>State</label>
                        <input type="text" name="state" value={state} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setState(e.target.value)} placeholder="Enter State" required/>

                        <label>Country</label>
                        <input type="text" name="country" value={country} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setCountry(e.target.value)} placeholder="Enter Country"  required/>

                        <label>Postcode</label>
                        <input type="text" name="postcode" value={postcode} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPostcode(e.target.value)} placeholder="Enter Postcode" required/>

                        <button type="submit">Save</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export default AddressEdit