# 🛍️ Moments Mart – Marketplace Module

**Moments Mart** is a marketplace platform built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) where **vendors can register, log in, and upload products** for customers to browse and purchase.  
This module focuses on vendor management, product uploads, and secure API integration.

---

## 🚀 Features
- **Vendor Authentication & Authorization** (JWT-based login & signup)
- **Vendor Dashboard** for product and profile management
- **Product Upload & Management** (Add, edit, delete products)
- **Image Upload Support** (via Cloudinary / Multer)
- **Responsive UI** for mobile & desktop
- **Secure REST API** with Express.js
- **Real-time product updates** with MongoDB

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux (or Context API), Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcrypt.js
- **File Upload:** Multer / Cloudinary
- **Styling:** Tailwind CSS / Bootstrap / Custom CSS

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ritesh-san/moments_mart.git
   cd moments_mart

2. **Install dependencies**

 - Server

    ```bash
        cd server
        npm install
    
- Client

    ```bash
        cd client
        npm install

3. **Create a .env file in the backend**

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

4. **Run the application**

- Start Server

    ```bash
        cd server
        npm run dev


- Start Client

    ```bash
    cd client
    npm run dev

## 📂 Folder Structure

```bash
moments_mart/
│
├── server/          # Express.js backend
│   ├── models/       # Vendor & Product schemas
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   └── server.js     # Entry point
│
├── client/         # React.js frontend
│   ├── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Vendor dashboard, login, upload product
│       ├── redux/       # State management
│       └── App.js
│
└── README.mdbash

```
## 📸 Screenshots

![Product list](https://i.postimg.cc/t4f8R5m5/screencapture-localhost-5173-category-6883e6c431acb86f7710daf0-2025-08-14-19-57-31.png)
![Order Details](https://i.postimg.cc/2j7pdnVk/screencapture-localhost-5173-account-orders-2025-08-14-19-56-53.png)
![Add Address](https://i.postimg.cc/V6XxVCgF/screencapture-localhost-5173-account-editaddress-2025-08-14-19-57-21.png)
![Add Product from Vendor end](https://i.postimg.cc/JzvzkShH/Screenshot-2025-08-14-195528.png)
![Checkout](https://i.postimg.cc/MTkk5D7T/screencapture-localhost-5173-checkout-2025-08-14-19-58-03.png)

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
