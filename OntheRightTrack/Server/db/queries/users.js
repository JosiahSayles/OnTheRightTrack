import bcrypt from "bcrypt";
import db from "../client.js";

export async function createUser(firstname, lastname, email, password) {
  const sql = `
 INSERT INTO users
 (firstname, lastname, email, password)
 VALUES 
 ($1, $2, $3, $4)
 RETURNING 
 id, firstname, lastname, email
 `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [firstname, lastname, email, hashedPassword]);
  return user;
}

export async function getUserByEmailandPassword(email, password) {
  const sql = `
SELECT * FROM users WHERE email=$1
`;
  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserById(id) {
  const sql = `
    SELECT id, firstname, lastname, email, avatarurl FROM users WHERE id=$1
    `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function updateUserInDB(id, fields) {
  const keys = Object.keys(fields);

  const setClause = keys.map((key, index) => `${key}=$${index + 1}`).join(", ");

  const values = Object.values(fields);

  const sql = `
    UPDATE users
    SET ${setClause}
    WHERE id=$${keys.length + 1}
    RETURNING id, firstname, lastname, email, avatarurl
  `;

  const {
    rows: [user],
  } = await db.query(sql, [...values, id]);

  return user;
}
