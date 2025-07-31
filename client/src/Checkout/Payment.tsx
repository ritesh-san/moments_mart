import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment=()=>{
    let [customer, setCustomer] = useState<any>()
    let [cart, setCart] = useState<any>()
    let [payment, setPayment] = useState<String>()
    let [selectaddress, setSelectaddress] = useState<String>()
    let [cartid, setcartId] = useState<String>()

    const nav=useNavigate();

    useEffect(()=>{
        if(sessionStorage.getItem('cart')) {
        setCustomer(JSON.parse(sessionStorage.getItem('customer')))
        setCart(JSON.parse(sessionStorage.getItem('cart')))
        setcartId(JSON.parse(sessionStorage.getItem('cart'))._id)
        }
        
    },[])

    let paymentMethod=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPayment(e.target.value)
    }

    let SelectAdd=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSelectaddress(e.target.value)
    }

    let placeOrder=()=>{
        cart.shipping_method = 'free'
        cart.shipping_address = JSON.parse(selectaddress)
        cart.billing_address = JSON.parse(selectaddress)
        cart.payment_method = payment
        cart.payment_method = payment
        cart.cart_id = cartid
        cart.status = 'pending'

        delete cart._id;
        delete cart.cart_number;
        delete cart.order_id;

        axios.post('http://localhost:4000/mart/order',cart)
        .then((res)=>{
            console.log(res)
            sessionStorage.setItem('ordernum', res?.data?.data.order_number)
            sessionStorage.setItem('orderid', res?.data?.data._id)
            sessionStorage.removeItem('cart')
            nav('/success')
        })
        .catch((err)=>{
            console.log(err)
            toast.error("Something went wrong!");
        })
    }

    return(
        <>
            <div className="checkout-container">
                
                <div>
                    <h2>Choose Billing/Shipping Address</h2>
                    <div className="address-section">
                        <div className="address-list">
                            {
                               
                                customer?.address?.map((add:any)=>{
                                    
                                    return <label className="address-card">
                                            <input type="radio" name="selectedAddress" value={JSON.stringify(add)} onClick={SelectAdd}  />
                                         
                                            <p>{add.street},<br/>
                                            {add.city}, {add.country}<br/>
                                            Zip - {add.postcode}</p>
                                            </label>
                                })
                            }
                            

                            

                            <label className="address-card">
                                <input type="radio" name="selectedAddress" value="new" onClick={SelectAdd} />
                                <p><strong>New Address</strong><br/>
                                <em>Fill form below</em></p>
                            </label>
                        </div>
                    </div>
                   {
                        (selectaddress == 'new') ?
                        <>
                        <h2>New Address Details</h2>
                    <div className="form-section">
                    <form>
                        <div className="form-group">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="Street Address"/>
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="City"/>
                        <input type="text" placeholder="State/Province"/>
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="Country"/>
                        <input type="text" placeholder="Zip Code"/>
                        </div>
                        <div className="form-group">
                        <input type="tel" placeholder="Phone Number"/>
                        <input type="email" placeholder="Email" />
                        </div>
                    </form>
                    </div> </> : null

                   }         
                    
                </div>

                
                <div className="summary-section">
                    <h2>Order Summary</h2>
                    <div className="cart-items">
                        {
                            cart?.items?.map((item)=>{
                                return <div className="cart-item"><span>{item.name}</span><span>Qty:{item.qty}</span><span>${item.subtotal}</span></div>
                            })
                        }
                    </div>
                    <div className="totals">
                    <div><span>Subtotal</span><span>${cart?.subtotal}</span></div>
                    <div><span>Shipping</span><span>${cart?.shipping_amount}</span></div>
                    <div><span>Total</span><span>${cart?.total}</span></div>
                    </div>

                    <div className="payment-methods">
                    <h3>Payment Method</h3>
                    <label><input type="radio" name="payment" value="Card" onClick={paymentMethod} /> Credit / Debit Card</label><br/>
                    <label><input type="radio" name="payment" value="COD" onClick={paymentMethod} /> Cash on Delivery</label>
                    </div>

                    <button className="btn" onClick={placeOrder}>Place Order</button>
                </div>
                </div>
        </>
    )
}

export default Payment