import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Order=({ orderdetails }: { orderdetails?: any })=>{

    const navigate = useNavigate();

     if (!orderdetails) {
        return <p>Loading order details...</p>;
    }
    
    return(
        <>
            <div className="order-page">
                <button style={{ float: 'right' }} onClick={()=> {navigate(0)}}>Back</button>
                <div className="order-header">
                <h1>Order {orderdetails.order_number}</h1>
                <p>Placed on: {orderdetails.createdAt}</p>
                <span className="status pending">{orderdetails.status}</span>
                </div>

                <div className="order-grid">
             
                <div className="order-card">
                    <h2>Customer</h2>
                    <p><strong>Name:</strong> {orderdetails.customer_name}</p>
                    <p><strong>Email:</strong> {orderdetails.customer_email}</p>
                </div>

                
                <div className="order-card">
                    <h2>Shipping Address</h2>
                    <p>{orderdetails?.shipping_address?.street}</p>
                    <p>{orderdetails?.shipping_address?.city}, {orderdetails?.shipping_address?.state}</p>
                    <p>{orderdetails?.shipping_address?.country} - {orderdetails?.shipping_address?.postcode}</p>
                </div>

               
                <div className="order-card">
                    <h2>Billing Address</h2>
                    <p>{orderdetails?.billing_address?.street}</p>
                    <p>{orderdetails?.billing_address?.city}, {orderdetails?.billing_address?.state}</p>
                    <p>{orderdetails?.billing_address?.country} - {orderdetails?.billing_address?.postcode}</p>
                </div>

                
                <div className="order-card">
                    <h2>Payment Method</h2>
                    <p>{(orderdetails.payment_method == 'COD') ? 'Cash ON Delivery (COD)' : 'Credit/Debit Card'}</p>
                    <p><strong>Shipping Method:</strong> {orderdetails.shipping_method}</p>
                </div>
                </div>

              
                <div className="items-section">
                <h2>Items</h2>
                {
                    orderdetails?.items?.map((item)=>{
                        return <div className="item-row">
                                <img src={item.image} alt={item.name} />
                                <div className="details">
                                <h3>{item.name}</h3>
                                <p>SKU: {item.sku}</p>
                                <p>Qty: {item.qty} × ₹{item.price}</p>
                                </div>
                                <div className="price">₹{item.subtotal}</div>
                            </div>
                    })
                }
                

                
                </div>

                
                <div className="summary-box">
                <div className="summary-row"><span>Subtotal:</span><span>₹{orderdetails.subtotal}</span></div>
                <div className="summary-row"><span>Tax:</span><span>₹{orderdetails.tax}</span></div>
                <div className="summary-row"><span>Shipping:</span><span>₹0</span></div>
                <div className="summary-row total"><span>Total:</span><span>₹{orderdetails.total}</span></div>
                </div>
            </div>
        </>
    )
}

export default Order