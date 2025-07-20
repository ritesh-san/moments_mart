import React from "react";

const Footer=()=>{
    return(
        <>
            <footer>
                <div className="newsletter container">
                <h3>Subscribe to Festy India</h3>
                <p>Get latest festival picks, deals & vendor updates.</p>
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
                </div>
                <div className="footer-links container">
                <div>
                    <h4>Explore</h4>
                    <a href="#">Shop</a>
                    <a href="#">About Us</a>
                    <a href="#">Vendor Sign Up</a>
                </div>
                <div>
                    <h4>Support</h4>
                    <a href="#">Help Center</a>
                    <a href="#">Returns</a>
                    <a href="#">Contact</a>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <a href="#">Instagram</a>
                    <a href="#">Facebook</a>
                    <a href="#">Pinterest</a>
                </div>
                </div>
                <div className="copyright">
                <p>&copy; 2025 Festy India. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer