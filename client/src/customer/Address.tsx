import React,{useState, useEffect} from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Address=()=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [customer, setCustomer] = useState<any>(JSON.parse(sessionStorage.getItem('customer')))
    const [address, setAddress] = useState<any>()
    const [addressid, setAddressId] = useState<any>()

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:4000/mart/address/'+customer._id)
        .then((res)=>{
            console.log(res.data.data)
            setAddress(res.data.data)
            setLoading(true)
        }).catch((err)=>{
            console.log(err)
            toast.error("Something went wrong!");
        })
        
        
    },[])

    const deleteadd = async(val:Number) =>{

      let flag = confirm(`Are you sure to delete this Address`);
      if(flag) {
        setLoading(false)
        

        axios.delete(`http://localhost:4000/mart/address/${customer._id}/${val}`)
          .then((res)=>{
              console.log(res.data.data)
              setAddress(res.data.data.address)
              setLoading(true)
          }).catch((err)=>{
              console.log(err)
              toast.error("Something went wrong!");
          })
      }
    }

    const edit= async (id:Number) =>{
      navigate(`/account/editaddress/${id}`)
    }

    return(
        <>
        <ToastContainer position="top-right" autoClose={3000} />
            <div className="product-list-container">
                  {/* Header */}
                  <div className="list-header">
                    <h2>My Address</h2>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/account/editaddress")}
                    >
                      Add Address
                    </button>
                  </div>
            
                  { (address) ? address.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover text-center align-middle product-table">
                        <thead className="table-dark">
                          <tr>
                            <th>Sr. Id</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Postcode</th>
                            <th style={{ width: "120px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {address.map((addr:any,aid:Number) => (
                            <tr key={aid}>
                              <td>
                                {(aid+1)}
                              </td>
                              <td>{addr.street}</td>
                              <td>{addr.city}</td>
                              <td>{addr.state}</td>
                              <td>{addr.country}</td>
                              <td>{addr.postcode}</td>
                              <td className="actions">
                                <button className="btn btn-sm btn-primary me-2 edit-btn" onClick={() => edit(aid)}>
                                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                                </button>
                                <button className="btn btn-sm btn-danger delete-btn" onClick={() => deleteadd(aid)}>
                                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
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
                </div>
        </>
    )
}

export default Address
