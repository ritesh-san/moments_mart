import React from "react";
import Menu from "../customer/Menu";

const Productupload=()=>{
    return(
        <>
        <div class="form-wrapper">
                <main className="main-content product-upload-container">
                    <h2>UPLOAD PRODUCT</h2>
                    <form action="/upload-product" method="POST" enctype="multipart/form-data">
                        

                        <label>Product Name</label>
                        <input type="text" name="name" placeholder="Enter Product Name" required/>

                        <label>SKU</label>
                        <input type="text" name="name" placeholder="Enter SKU" required/>

                        <label>Description</label>
                        <textarea name="description" placeholder="Short Description" rows="3" required></textarea>

                        <label>Price</label>
                        <input type="number" name="price" placeholder="Enter Price" step="0.01" required/>

                        <label>Category</label>
                        <select name="category" required>
                            <option value="">Select Category</option>
                            <option value="decor">Decor</option>
                            <option value="ethnic">Ethnic Wear</option>
                            <option value="gifts">Gifts</option>
                        </select>

                        <label>Image</label>
                        <input type="file" name="image" accept="image/*" required/>

                        <button type="submit">Upload</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Productupload