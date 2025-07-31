import React, {useState, useEffect} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryDetails = () =>{

    const { id } = useParams();
    const location = useLocation();

    const [category, setCategory] = useState<any>();
    const [products, setProducts] = useState<any>();

    const nav=useNavigate();

    useEffect(()=>{
        //const { id } = useParams();

        axios.get('http://localhost:4000/mart/category/'+id)
        .then((res)=>{
            console.log("category"+res?.data.data.name)
            if(res?.data.success) {
                setCategory(res?.data?.data);
                axios.get('http://localhost:4000/mart/prolist/'+id)
                .then((res)=>{
                    console.log("products"+res?.data?.data)
                    if(res?.data.success) {
                        setProducts(res?.data?.data);
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    },[location])

    const addtocart = (e:React.ChangeEvent<HTMLButtonElement>)=>{
        const customer = JSON.parse(sessionStorage.getItem('customer'));
        const id = e.target.value;

        if(!customer) {
            nav('/login');
        } else {
            axios.post('http://localhost:4000/mart/cart/'+ customer?._id)
            .then((res)=>{
                console.log(res)
                if(res?.data.success) {
                    axios.put('http://localhost:4000/mart/cartadditem',{cartid: res?.data?.data._id, proid: id, qty: 1 })
                    .then((res)=>{
                        console.log(res)
                        sessionStorage.setItem('cart', JSON.stringify(res?.data.data))
                        const product = products.find((item:any)=>{
                            return (item._id == id) ? item : null;
                        })
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
            <div className="category-container">
                <h2 className="title">{category?.name}</h2>
                {
                        (products?.length > 0) ?
                        (
                            <>
                            <div className="product-grid">
                                {
                                
                                products.map((product)=>{
                                    return <div className="product-card">
                                                <a href={`/item/${product._id}`}><img src={product.image} alt={product.productName} /></a>
                                                <a href={`/item/${product._id}`}><h4 className="product-title">{product.productName}</h4></a>
                                                <p className="price">${product.price}</p>
                                                <button className="btn" value={product._id} onClick={addtocart}>Buy Now</button>
                                            </div>
                                })
                            }
                                
                            </div>

                            <div className="pagination">
                                <button className="page-btn">&laquo;</button>
                                <button className="page-btn active">1</button>
                                <button className="page-btn">2</button>
                                <button className="page-btn">3</button>
                                <button className="page-btn">&raquo;</button>
                            </div>
                            </>
                ): <p style={{ color: "red" }}>No Record found for this category</p>
                    }

                
            </div>
        </>
    )
}

export default CategoryDetails