import React from "react";

const Home=()=>{
    return(
        <>
            <section className="hero">
                <img src="/images/f5-02.jpg" alt="Festive Banner" />
                <div className="hero-text">
                <h2>Back to School Festive Picks</h2>
                <p>Celebrate with unique gifts and handcrafted style</p>
                <a href="#" className="btn">Shop Now</a>
                </div>
            </section>

            
            <section className="categories container">
                <h2>Festival Categories</h2>
                <div className="category-grid">
                <div><img src="images/cat1.jpg" /><p>Lights & Diyas</p></div>
                <div><img src="images/cat2.jpg" /><p>Gift Hampers</p></div>
                <div><img src="images/cat3.jpg" /><p>Traditional Wear</p></div>
                <div><img src="images/cat4.jpg" /><p>Decor & Crafts</p></div>
                </div>
            </section>

            
            <section className="products container">
                <h2>Top Festival Picks</h2>
                <div className="product-grid">
                <div className="product-card">
                    <img src="images/product1.jpg" />
                    <h3>Handmade Diya Set</h3>
                    <p>₹299</p>
                </div>
                <div className="product-card">
                    <img src="images/product2.jpg" />
                    <h3>Printed Kurti</h3>
                    <p>₹899</p>
                </div>
                <div className="product-card">
                    <img src="images/product3.jpg" />
                    <h3>Gift Box Combo</h3>
                    <p>₹499</p>
                </div>
                </div>
            </section>
        </>
    )
}

export default Home;