import React, {useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from "./Orderdetails";

const Orderlist = () =>{

    const[orders, setOrders] = useState<any>()
    const[order, setOrder] = useState<any>()
    const[status, setStatus] = useState<any>(false)

    useEffect(()=>{
        let customer = JSON.parse(sessionStorage.getItem('customer'))
        axios.get(`http://localhost:4000/mart/order/${customer._id}`)
        .then((res)=>{
            console.log(res.data.data)
            setOrders(res.data.data)
        }).catch((err)=>{
            console.log(err)
            toast.error("Something went wrong!");
        })
    },[])

    const changstatus=(order:any)=>{
        setOrder(order)
        setStatus(true)
    }

    return(
        <>
        {
            (!status) ? 
        
            (<div className="product-list-container">
                  {/* Header */}
                  <div className="list-header">
                    <h2>My Order</h2>
                  </div>
            
                  { (orders) ? orders.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover text-center align-middle product-table">
                        <thead className="table-dark">
                          <tr>
                            <th>Order Number</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th style={{ width: "120px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((orderdata:any,aid:Number) => (
                            <tr key={aid}>
                              <td>
                                {orderdata.order_number}
                              </td>
                              <td>{orderdata.customer_name}</td>
                              <td>{orderdata.customer_email}</td>
                              <td>{orderdata.total}</td>
                              <td>{orderdata.status}</td>
                              <td>{orderdata.createdAt}</td>
                              <td className="actions">
                                <button className="btn btn-sm btn-primary me-2 edit-btn" onClick={() => changstatus(orderdata)}>
                                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center">No Address found</p>
                  ): <p className="text-center">No Address found</p>}
                </div>) : <Order orderdetails={order} />
}
        </>
    )
}

export default Orderlist