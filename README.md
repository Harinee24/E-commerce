# 🛒 E-Commerce Web Application (MERN – Simplified Version)

A simplified full-stack E-Commerce Web Application built using the MERN stack.
This project demonstrates core e-commerce functionalities with minimal file structure.

The application includes:

User Authentication (JWT-based)

Product Listing

Shopping Cart

Order Placement

Admin Product Management



---

🚀 Features

👤 User Features

User Registration

User Login (JWT Authentication)

View Products

Add Products to Cart

Place Order


🛠️ Admin Features

Admin Login

Add New Products

View All Orders (Admin Only)



---

🛠️ Tech Stack

Frontend

React.js

Axios

CSS


Backend

Node.js

Express.js

MongoDB

Mongoose

bcryptjs (Password Encryption)

JSON Web Token (JWT)

CORS



---

📁 Project Structure

All functionality is implemented using only three files:

MainPage.js      → React frontend
MainPage.css     → Styling
server.js        → Backend (Authentication + Products + Orders)

Database used:

MongoDB (ecommerceDB)


---

⚙️ Installation & Setup

1️⃣ Initialize Backend

npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors


---

2️⃣ Install Frontend Dependency

npm install axios


---

3️⃣ Start MongoDB

Ensure MongoDB is running locally:

mongodb://127.0.0.1:27017/ecommerceDB


---

4️⃣ Run Backend Server

node server.js

Server runs at:

http://localhost:5000


---

5️⃣ Run React Application

Ensure MainPage.js is imported inside App.js.

npm start

Frontend runs at:

http://localhost:3000


---

🔐 Authentication System

Passwords are encrypted using bcrypt.

JWT token is generated during login.

Token is required for protected routes.

Role-based access control is implemented (User / Admin).



---

📡 API Endpoints Overview

Authentication

POST /register

POST /login


Products

GET /products

POST /products (Admin Only)


Orders

POST /order

GET /admin/orders (Admin Only)



---

🔄 Application Workflow

1. User registers or logs in.


2. Products are fetched from MongoDB.


3. User adds items to cart.


4. User places order.


5. Admin can add products and view all orders.




---

🎯 Learning Outcomes

Full-stack MERN development

JWT-based authentication

Role-based authorization

REST API development

Cart and order logic implementation

Admin dashboard logic



---
