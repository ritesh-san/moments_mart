import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductsDeatils = ()=>{
    const [product, setProduct] = useState<any>()
    const [qty, setQty] = useState<any>(1)
    const { id } = useParams();

    const nav=useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:4000/mart/proinfo/'+id)
        .then((res)=>{
            console.log(res?.data.data)
            if(res?.data.data) {
                setProduct(res?.data?.data)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const valup =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setQty(e.target.value)
    }

    const addtocart = ()=>{
        const customer = JSON.parse(sessionStorage.getItem('customer'));
        if(!customer) {
            nav('/login');
        } else {
            axios.post('http://localhost:4000/mart/cart/'+ customer?._id)
            .then((res)=>{
                console.log(res)
                if(res?.data.success) {
                    axios.put('http://localhost:4000/mart/cartadditem',{cartid: res?.data?.data._id, proid: id, qty: qty })
                    .then((res)=>{
                        console.log(res)
                        sessionStorage.setItem('cart', JSON.stringify(res?.data.data))
                        toast.success(`${product.productName} added to cart!`);
                    })
                    .catch((err)=>{
                        console.log(err)
                        toast.error("Something went wrong!");
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
                toast.error("Something went wrong!");
            })
        }
        
    }

    return(
        <>
        <ToastContainer position="top-right" autoClose={3000} />
            <div className="product-container">
                <div className="product-image">
                <img src={product?.image} alt={product?.productName} />
                </div>

                <div className="product-info">
                <h1 className="product-title">{product?.productName}</h1>
                <p className="product-description">Sku: {product?.productSKU}</p>
                <p className="product-price">${product?.price}</p>
                <p className="product-description">
                    {product?.description}
                </p>
                <div className="product-actions">
                    <input type="number" min="1" value="1" name="qty" onChange={valup} className="product-qty" />
                    <button className="add-to-cart" onClick={addtocart}>Add to Cart</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default ProductsDeatils