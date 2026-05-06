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

task-manager/
│
├── models/ # MongoDB Schemas
├── routes/ # API Routes
├── client/ # Frontend files
├── app.js # Main server file
├── package.json

## 🚀 Installation & Setup

# Clone the repository
git clone https://github.com/moinshaik9/task-manager-fullstack.git

# Go into project folder
cd task-manager  

# Install dependencies
npm install

# Start server
node app.js  (cmd 1)

start index.html (cmd 2)
