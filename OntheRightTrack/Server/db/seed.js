import db from "./client.js";
import { createUser } from "./queries/users.js";
import { createJobApplication } from "./queries/job_applications.js";

await db.connect();
await seed();
await db.end();
console.log("Database seeded");

async function seed() {
  for (let i = 0; i < 20; i++) {
    const userId = await createUser(
      "firstname " + i,
      "lastname " + i,
      "Email" + i + "@email.com",
      "Password" + i,
    );

    for (let j = 0; j < 5; j++) {
      await createJobApplication(
        "Company " + j,
        "Job title" + j,
        "City " + j,
        "2026-02-09",
        "applied",
        "https://example.com/job" + j,
        "Notes about Job" + j,
        userId.id,
      );
    }
  }
}
