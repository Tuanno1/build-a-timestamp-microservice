import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  try {
    const dataPath = path.resolve("./data/users.json");
    const fileData = await fs.readFile(dataPath, "utf-8");
    const users = JSON.parse(fileData);

    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;