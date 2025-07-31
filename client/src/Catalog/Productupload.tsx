import React, { useState, useEffect, useRef } from "react";
import Menu from "../customer/Menu";
import axios from "axios";


const Productupload=()=>{
    const[category, setCategory] = useState<any>();

    const [image, setImage] = useState<File | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [productSKU, setProductSKU] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const[selectcat, setSelectcat] = useState<any>();

    const ref1 = useRef();

    useEffect(()=>{
        axios.get('http://localhost:4000/mart/categories')
        .then((res)=>{
            console.log(res)
            if(res?.data?.success) {
                setCategory(res?.data?.data);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
      const customer = JSON.parse(sessionStorage.getItem("customer") || "{}");
    if (!customer._id) {
      alert("Vendor ID not found. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // file input name must match multer field
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('productSKU', productSKU);
    formData.append('category', selectcat);
    formData.append('price', price);
    formData.append("vendorId", customer._id);

    try {
      const res = await axios.post('http://localhost:4000/mart/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Uploaded:', res.data);

      ref1.current.innerHTML = `Product insert successfully`
      setProductName("");
      setDescription("");
      setProductSKU("");
      setPrice(0);
      setSelectcat("");
      setImage(null);
    } catch (err) {
      console.error(err);
    }
  };

    return(
        <>
        <div className="form-wrapper">
                <main className="main-content product-upload-container">
                    <h2>UPLOAD PRODUCT</h2>
                    <h3 ref={ref1}></h3>
                    <form action="/upload-product" onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
                        

                        <label>Product Name</label>
                        <input type="text" name="productName" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setProductName(e.target.value)} placeholder="Enter Product Name" required/>

                        <label>SKU</label>
                        <input type="text" name="productSKU" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setProductSKU(e.target.value)} placeholder="Enter SKU" required/>

                        <label>Description</label>
                        <textarea name="description" onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=> setDescription(e.target.value)} placeholder="Short Description" rows="3" required></textarea>

                        <label>Price</label>
                        <input type="number" name="price" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPrice(e.target.value)} placeholder="Enter Price" step="0.01" required/>

                        <label>Category</label>
                        <select name="category" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setSelectcat(e.target.value)}  required>
                            <option value="">Select Category</option>
                            {
                            (category && category.length > 0) ?
                                    (
                                        category.map((item:any)=>{
                                            return <option value={`${item._id}`}>{item.name}</option>
                                        })
                                    ):null
                            }
                        </select>

                        <label>Image</label>
                        <input type="file" name="image" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setImage(e.target.files[0])} accept="image/*" required/>

                        <button type="submit">Upload</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Productupload