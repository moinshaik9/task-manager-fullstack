const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/User');
const Task = require('../models/Task');


// 🔐 MAIL CONFIG (IMPORTANT: replace with your real email)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "smoinuddinaahmed12@gmail.com",   // ✅ your email
    pass: "YOUR_APP_PASSWORD"               // 🔐 Gmail App Password
  }
});


// 🔐 AUTH MIDDLEWARE
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
}


// 🔐 REGISTER (WITH OTP + EXPIRY)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashed,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // ⏱ 5 min expiry
      isVerified: false
    });

    await user.save();

    console.log("OTP:", otp); // 🔥 DEBUG (see in CMD)

    await transporter.sendMail({
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    });

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔐 VERIFY OTP
router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "User not found" });

    if (user.otp !== otp)
      return res.json({ message: "Invalid OTP" });

    if (user.otpExpires < Date.now())
      return res.json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({ message: "Account verified successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔐 RESEND OTP
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;

  await user.save();

  console.log("New OTP:", otp);

  await transporter.sendMail({
    to: email,
    subject: "Resend OTP",
    text: `Your new OTP is ${otp}`
  });

  res.json({ message: "OTP resent" });
});


// 🔐 LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.json({ message: "User not found" });

    if (!user.isVerified)
      return res.json({ message: "Verify OTP first" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📌 TASK ROUTES (PROTECTED)
router.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/tasks', auth, async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.json(newTask);
});

router.put('/tasks/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

router.delete('/tasks/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;