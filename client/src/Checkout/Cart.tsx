import React,{useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatecart } from "../reducers/redusers";
import { useDispatch } from "react-redux";

const Cart = ()=>{
    const [cart, setCart] = useState<any>()

    const dispatch = useDispatch();

    useEffect(()=>{
        
        const sessioncart:any = JSON.parse(sessionStorage.getItem('cart'));
         dispatch(
                    updatecart({
                        //count: res?.data.data?.items?.length,
                        cartItems: sessioncart.items,
                    })
                );
        setCart(sessioncart);
    },[])

    let checkout=()=>{
        window.location.href="/checkout"
    }

    let qtyUpdate = (itemid:Number, action:string) =>{
        let qtydata = {
            cartid: cart._id,
            itemid: itemid,
            qty: 1,
            action: action
        }
        axios.put(`http://localhost:4000/mart/cartupdateqty/`, qtydata)
          .then((res)=>{
              console.log(res.data.data)
              setCart(res.data.data)
              dispatch(
                    updatecart({
                        //count: res?.data.data?.items?.length,
                        cartItems: res?.data.data?.items,
                    })
                );
              sessionStorage.setItem('cart', JSON.stringify(res?.data.data))
              
          }).catch((err)=>{
              console.log(err)
              toast.error("Something went wrong!");
          })
    }

    return(
        <>
        <ToastContainer position="top-right" autoClose={3000} />
            {
                (cart?.items.length > 0) ?
                (
                    <div className="cart-container">
                        <h2>Your Shopping Cart</h2>
                        
                        <div className="cart-items">
                            {
                                cart.items.map((item:any, index:Number)=>{
                                    return <div className="cart-item">
                                                <img src={item.image} alt={item.name} />
                                                <div className="item-details">
                                                    <h4>{item.name}</h4>
                                                    <p>Price: ₹{item.price}</p>
                                                    <div className="quantity">
                                                    <button onClick={()=> qtyUpdate(item.id, 'min')}>-</button>
                                                    <input type="text" value={item.qty} />
                                                    <button onClick={()=> qtyUpdate(item.id, 'plus')}>+</button>
                                                    </div>
                                                </div>
                                                <div className="item-total">₹{item.subtotal}</div>
                                            </div>
                                })
                            }
                            

                        </div>

                        <div className="cart-summary">
                            <h3>Cart Summary</h3>
                            <p>Subtotal: ₹{cart.subtotal}</p>
                            <p>Shipping: ₹{cart.shipping_amount}</p>
                            <h4>Total: ₹{cart.total}</h4>
                            <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
                        </div>
                    </div>
                ): <div className="cart-container"><p>Your Cart is Empty</p></div>
            }
            
        </>
    )
}

export default  Cart