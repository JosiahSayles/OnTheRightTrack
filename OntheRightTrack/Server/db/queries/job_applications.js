import db from "../client.js";

export async function createJobApplication(
  companyname,
  jobtitle,
  location,
  applicationdate,
  status,
  joburl,
  notes,
  user_id,
  resume_id,
  cover_letter_id,
) {
  const sql = `
    INSERT INTO job_applications (companyname, jobtitle, location, applicationdate, status, joburl, notes, user_id, resume_id, cover_letter_id)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `;
  const {
    rows: [job_application],
  } = await db.query(sql, [
    companyname,
    jobtitle,
    location,
    applicationdate,
    status,
    joburl,
    notes,
    user_id,
    resume_id,
    cover_letter_id,
  ]);
  return job_application;
}

export async function getApplicationsByUserId(userId) {
  const sql = ` 
    SELECT * FROM job_applications WHERE user_id=$1
    `;
  const { rows: applications } = await db.query(sql, [userId]);
  return applications;
}

export async function getAllApplications() {
  const sql = `
    SELECT * FROM job_applications
    `;
  const { rows: applications } = await db.query(sql);
  return applications;
}

export async function getApplicationById(id) {
  const sql = ` 
    SELECT * FROM job_applications WHERE id=$1
     `;
  const {
    rows: [application],
  } = await db.query(sql, [id]);
  return application;
}

export async function deleteApplication(id) {
  const sql = `
    DELETE FROM job_applications WHERE id=$1 
    `;
  await db.query(sql, [id]);
}

export async function updateApplication(
  id,
  companyname,
  jobtitle,
  location,
  applicationdate,
  status,
  joburl,
  notes,
  user_id,
) {
  const sql = ` 
    UPDATE job_applications 
    SET
     companyname = $2, 
     jobtitle = $3, 
     location = $4, 
     applicationdate = $5, 
     status = $6, 
     joburl = $7, 
     notes = $8
    WHERE id = $1 AND user_id = $9 
    RETURNING *  
    `;
  const {
    rows: [application],
  } = await db.query(sql, [
    id,
    companyname,
    jobtitle,
    location,
    applicationdate,
    status,
    joburl,
    notes,
    user_id,
  ]);
  return application;
}
