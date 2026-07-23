const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

require("dotenv").config();

const app = express();
app.use(express.json());
// Allow CORS from any origin for ease of use (especially for frontend on Vercel)
app.use(cors({ origin: "*" }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Resend
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

// Models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

// Email Template
function getVerificationEmailHtml(name, otp) {
  return `
    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #2563eb; color: white; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to Tooliqo 👋</h1>
      </div>
      <div style="padding: 32px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #334155;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #334155;">Thanks for joining Tooliqo. To keep your account secure, please verify your email address using the OTP below.</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; text-align: center; border-radius: 8px; margin: 32px 0;">
          <h2 style="margin: 0; font-size: 32px; letter-spacing: 4px; color: #0f172a;">${otp}</h2>
        </div>
        <p style="font-size: 14px; color: #64748b; text-align: center;">The OTP expires in 10 minutes.</p>
      </div>
    </div>
  `;
}

// Routes
app.get("/health", (req, res) => res.send("Backend is healthy!"));

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing required fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
    } else {
      await User.create({ name, email, password: hashedPassword, otp, otpExpiry, isVerified: false });
    }

    await resend.emails.send({
      from: "Tooliqo <support@tooliqo.in>",
      to: [email],
      subject: "Verify your email • Tooliqo",
      html: getVerificationEmailHtml(name, otp)
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

app.post("/api/auth/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(404).json({ message: "Account Not Found" });
    if (user.isVerified) return res.status(400).json({ message: "Account already verified" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (!user.otpExpiry || user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP Expired" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET || "fallback", { expiresIn: "7d" });
    res.status(200).json({ message: "Account verified", user: { name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: "Network Error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Account Not Found" });
    if (!user.isVerified) return res.status(403).json({ message: "Please verify your account first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect Password" });

    const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET || "fallback", { expiresIn: "7d" });
    res.status(200).json({ message: "Logged in successfully", user: { name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: "Network Error" });
  }
});

app.get("/api/auth/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Not authenticated" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback");
    
    const user = await User.findById(decoded.userId).select("-password -otp -otpExpiry");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
