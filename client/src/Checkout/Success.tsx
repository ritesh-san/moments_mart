import React,{useState, useEffect} from "react";
import axios from "axios";
import Order from "../Order/Orderdetails";

const Success = () =>{
    let [ordernum, setOrdernum] = useState<String>()
    let [orderid, setOrderId] = useState<String>()
    let [order, setOrder] = useState<String>()
    let [status, setStatus] = useState<Boolean>(false)

    useEffect(()=>{
        setOrdernum(sessionStorage.getItem('ordernum'))
        setOrderId(sessionStorage.getItem('orderid'))

        axios.get('http://localhost:4000/mart/order/'+sessionStorage.getItem('orderid'))
        .then((res)=>{
            console.log(res)
            setOrder(res?.data?.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const changeStatus=()=>{
        setStatus(true)
    }

    return(
        <>
            
            {
                    (status)? <Order orderdetails={order} />:<div className="success-wrapper">
                                    <div className="success-box">
                                    <div className="checkmark">&#10003;</div>
                                    <h1>Thank You!</h1>
                                    <p>Your order(<strong onClick={changeStatus}>{ordernum}</strong>) has been placed successfully.</p>
                                    <p>We'll send you a confirmation email shortly.</p>
                                    <a href="/" className="back-home">Continue Shopping</a>
                                    </div>
                                    
                                </div>
                }
        </>
    )
}

export default Success