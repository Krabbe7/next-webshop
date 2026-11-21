import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
// Falsk hash, så login tager lige lang tid, uanset om e-mailen findes
const DUMMY_HASH = bcrypt.hashSync("dummy-password", SALT_ROUNDS);
export async function registerUserService(
  username: string,
  email: string,
  password: string,
) {
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    `
    INSERT INTO users (username, email, password, role)
    VALUES ($1, $2, $3, 'user')
    RETURNING id, username, email, role
    `,
    [username, email, hashedPassword],
  );

  return result.rows[0];
}

export async function loginUserService(email: string, password: string) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(
    password,
    user?.password ?? DUMMY_HASH,
  );

  if (!user || !passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}
