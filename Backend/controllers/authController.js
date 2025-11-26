import db from "../database/database.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer.js"; // adjust path if needed

export const signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      department,
      password,
      role_id
    } = req.body;

    // ✅ Required fields check
    if (!firstname || !lastname || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    // ✅ Check if email exists
    const [existing] = await db.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    if (existing.length > 0)
      return res.status(400).json({ msg: "Email already in use" });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Determine role and status logic
    const actualRole = role_id === "2" ? null : role_id;
    const status = role_id === "2" ? "Pending" : "Active";
    const applyingFor = role_id === "2" ? "Organizer" : null;

    // ✅ Insert user into DB
    await db.query(
      `INSERT INTO user 
      (firstname, lastname, email, phone, department, password, role_id, status, applying_for)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        email,
        phone,
        department,
        hashedPassword,
        actualRole,
        status,
        applyingFor
      ]
    );

    // ✅ Send email notification
    try {
      if (role_id === "2") {
        // Organizer application
        await sendEmail(
          email,
          "Organizer Application Received",
          `<h1>Hello ${firstname}!</h1>
           <p>Your application to become an Organizer has been received.</p>
           <p>Waiting for admin approval.</p>`
        );
      } else {
        // Regular signup
        await sendEmail(
          email,
          "Welcome to Our System",
          `<h1>Welcome ${firstname}!</h1>
           <p>Your account has been successfully created and is now active.</p>`
        );
      }
    } catch (err) {
      console.error("Failed to send signup email:", err);
      // Note: We do not fail signup if email fails
    }

    // ✅ Return response
    const message =
      role_id === "2"
        ? "Organizer application received. Waiting for admin approval."
        : "Signup successful.";

    return res.json({ msg: message });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email and password required" });

  try {
    const [results] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    if (results.length === 0)
      return res.status(400).json({ msg: "User not found" });

    const user = results[0];

    // 🔴 Banned check
    if (user.status === "banned") {
      return res.status(403).json({ msg: "Your account has been banned." });
    }

    // 🔍 Password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ⏳ Optional inactivity check/update
    await db.query(
      "UPDATE user SET last_active = NOW() WHERE user_id = ?",
      [user.user_id]
    );

    // ⭐ Issue token with role_id included
    const token = jwt.sign(
      { id: user.user_id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        status: user.status,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


