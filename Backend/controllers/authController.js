import db from "../database/database.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Signup
export const signup = async (req, res) => {
  const {
    student_id,
    firstname,
    lastname,
    email,
    course,
    department,
    year_level,
    phone,
    password,
  } = req.body;

  if (!student_id || !firstname || !lastname || !email || !password)
    return res.status(400).json({ msg: "Please fill in all required fields." });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO user (
        student_id, firstname, lastname, email, course,
        department, year_level, phone, password, role_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      student_id,
      firstname,
      lastname,
      email,
      course,
      department,
      year_level,
      phone,
      hashedPassword,
      1, // default role_id = Student
      "active", // default status
    ]);

    const userId = result.insertId;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({
      msg: "User registered successfully!",
      token,
      user: { id: userId, firstname, lastname, email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
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

    // ⏳ Check inactivity
    const THRESHOLD_MINUTES = 10;

    const [checkInactive] = await db.query(
      `SELECT TIMESTAMPDIFF(MINUTE, last_active, NOW()) AS inactive_minutes 
       FROM user WHERE user_id = ?`,
      [user.user_id]
    );

    const inactiveMinutes = checkInactive[0].inactive_minutes;

    // ✔ If inactive: mark inactive in DB (optional)
    if (inactiveMinutes >= THRESHOLD_MINUTES && user.status !== "inactive") {
      await db.query(`
        UPDATE user 
        SET status = 'inactive' 
        WHERE user_id = ?
      `, [user.user_id]);
    }

    // ⭐ If user is inactive but logs in → reactivate automatically
    if (user.status === "inactive") {
      await db.query(`
        UPDATE user 
        SET status = 'active', last_active = NOW() 
        WHERE user_id = ?
      `, [user.user_id]);
      user.status = "active";
    }

    // 🟢 Always update last_active for successful login
    await db.query(
      "UPDATE user SET last_active = NOW() WHERE user_id = ?",
      [user.user_id]
    );

    // 🟢 Issue Token
    const token = jwt.sign(
      { id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
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

