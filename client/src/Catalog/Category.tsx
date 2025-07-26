import React, {useState, useEffect} from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const CategoryDetails = () =>{

    const { id } = useParams();
    const location = useLocation();

    const [category, setCategory] = useState<any>();
    const [products, setProducts] = useState<any>();

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

    return(
        <>
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
                                                <img src={product.image} alt={product.productName} />
                                                <h4 className="product-title">{product.productName}</h4>
                                                <p className="price">${product.price}</p>
                                                <button className="btn">Buy Now</button>
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