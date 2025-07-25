import React from "react";

const Footer=()=>{
    return(
        <>
           <footer class="footer">
  <div class="footer-container">
    <div class="footer-column">
      <h4>Explore</h4>
      <ul>
        <li>Shop</li>
        <li>About Us</li>
        <li>Vendor</li>
        <li>Sign Up</li>
      </ul>
    </div>

    <div class="footer-column">
      <h4>Follow Us</h4>
      <ul>
        <li>Instagram</li>
        <li>Facebook</li>
        <li>Pinterest</li>
      </ul>
    </div>

    <div class="footer-column">
      <h4>Support</h4>
      <ul>
        <li>Help Center</li>
        <li>Returns</li>
        <li>Contact</li>
      </ul>
    </div>

    <div class="footer-column center">
      <h3>Subscribe to Festy India</h3>
      <p>Get latest festival picks, deals & vendor updates.</p>
      <div class="subscribe-form">
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
      
    </div>

    
  </div>
  <div class="footer-bottom">
    © 2025 Festy India. All Rights Reserved.
  </div>
</footer>
        </>
    )
}

export default Footer