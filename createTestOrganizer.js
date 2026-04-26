// Script to create a test organizer account in the database
import db from "./Backend/database/database.js";
import bcrypt from "bcryptjs";

async function createTestOrganizer() {
  const firstname = "Test";
  const lastname = "Organizer";
  const email = "testorganizer@crimson.com";
  const phone = "09123456789";
  const department = "CCS";
  const password = "Organizer@12345";
  const role_id = 2; // Organizer
  const status = "Active";
  const applying_for = null;

  // Check if already exists
  const [existing] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  if (existing.length > 0) {
    console.log("❌ Test organizer already exists:", email);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO user (firstname, lastname, email, phone, department, password, role_id, status, applying_for)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      firstname,
      lastname,
      email,
      phone,
      department,
      hashedPassword,
      role_id,
      status,
      applying_for
    ]
  );

  console.log("✅ Test organizer account created:");
  console.log("  Email:", email);
  console.log("  Password:", password);
}

createTestOrganizer().catch(err => {
  console.error("❌ Error creating test organizer:", err);
  process.exit(1);
});
