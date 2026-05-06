# 🚀 Task Manager Full Stack Application

A modern full-stack Task Manager application built using **Node.js, Express, MongoDB, and Vanilla JS** with secure authentication and OTP verification.

---

## 📌 Features

- 🔐 User Registration with Email OTP Verification
- 🔑 Secure Login using JWT Authentication
- 📧 OTP Expiry & Resend Functionality
- ✅ Create, Update, Delete Tasks
- 🔒 Protected Routes (Only logged-in users can access tasks)
- 💾 Persistent storage using MongoDB
- 🎨 Clean UI using Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS (Tailwind)
- JavaScript

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (Mongoose)

**Authentication:**
- JWT (JSON Web Token)
- bcrypt (Password hashing)

**Email Service:**
- Nodemailer (OTP Verification)

---

## ⚙️ How It Works

1. User registers with email & password  
2. OTP is generated and sent to email  
3. User verifies OTP  
4. Login generates JWT token  
5. Token is used to access protected APIs  
6. User can manage tasks (CRUD operations)  

---

## 📂 Project Structure
