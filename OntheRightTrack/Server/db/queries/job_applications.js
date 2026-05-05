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

export async function updateApplication(id, user_id, fields) {
  const allowedFields = [
    "companyname",
    "jobtitle",
    "location",
    "applicationdate",
    "status",
    "joburl",
    "notes",
    "interviewdate",
  ];

  const keys = Object.keys(fields).filter(
    (key) => allowedFields.includes(key) && fields[key] !== undefined,
  );

  if (keys.length === 0) {
    throw new Error("No valid fields to update");
  }

  const setClause = keys.map((key, index) => `${key}=$${index + 1}`).join(", ");

  const values = keys.map((key) => fields[key]);

  const sql = `
    UPDATE job_applications
    SET ${setClause}
    WHERE id=$${keys.length + 1} AND user_id=$${keys.length + 2}
    RETURNING *
  `;

  const {
    rows: [application],
  } = await db.query(sql, [...values, id, user_id]);

  return application;
}

// export async function updateJobStatus(id, status) {
//   const sql = `UPDATE job_applications
//   SET status =$2 WHERE id= $1 RETURNING *`;

//   const { rows: job_application } = await db.query(sql, [id, status]);
//   return job_application;
// }

// export async function updateInterviewDate(id, interviewdate, user_id) {
//   const sql = `UPDATE job_applications
//   SET interviewdate =$2 WHERE id =$1 AND user_id =$3 RETURNING * `;
//   const { rows: application } = await db.query(sql, [
//     id,
//     interviewdate,
//     user_id,
//   ]);
//   return application;
// }
