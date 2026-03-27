import db from "../client.js";

export async function createDocument(type, filename, fileurl, user_id) {
  const sql = `INSERT INTO documents (type, filename, fileurl, user_id) 
  VALUES ($1, $2, $3, $4)
  RETURNING *`;
  const {
    rows: [document],
  } = await db.query(sql, [type, filename, fileurl, user_id]);
  return document;
}

export async function getDocumentsByUserId(user_id) {
  const sql = `SELECT * FROM documents WHERE user_id=$1`;
  const { rows: documents } = await db.query(sql, [user_id]);
  return documents;
}

export async function deleteDocumentById(id) {
  const sql = `
    DELETE FROM documents WHERE id=$1 `;
  await db.query(sql, [id]);
}

export async function getDocumentById(id) {
  const sql = ` SELECT * FROM documents WHERE id=$1`;
  const {
    rows: [document],
  } = await db.query(sql, [id]);
  return document;
}
