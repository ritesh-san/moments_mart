import React,{useState, useEffect} from "react";

const Cart = ()=>{
    const [cart, setCart] = useState<any>()

    useEffect(()=>{
        const sessioncart = sessionStorage.getItem('cart');
        setCart(JSON.parse(sessioncart));
    },[])

    let checkout=()=>{
        window.location.href="/checkout"
    }

    return(
        <>
            {
                (cart) ?
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
                                                    <button>-</button>
                                                    <input type="text" value={item.qty} />
                                                    <button>+</button>
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
                ): `<p>Your Cart is Empty</p>`
            }
            
        </>
    )
}

export default  Cart