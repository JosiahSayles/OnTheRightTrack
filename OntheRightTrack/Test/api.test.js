import "dotenv/config";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../Server/app.js"; // Adjust path
import db from "../Server/db/client.js";

describe("API Tests", () => {
  let token;
  let appId;

  beforeAll(async () => {
    await db.connect(); // Ensure DB is connected
  });

  afterAll(async () => {
    await db.end();
  });

  it("should register a user", async () => {
    const res = await request(app).post("/users/register").send({
      firstname: "Lane",
      lastname: "Doe",
      email: "Lane@example.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: "jane@example.com", password: "password123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should get user info with auth", async () => {
    const res = await request(app)
      .get("/users/user")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", "jane@example.com");
  });

  it("should create an application", async () => {
    const res = await request(app)
      .post("/applications")
      .set("Authorization", `Bearer ${token}`)
      .send({
        companyname: "Apple",
        jobtitle: "Developer",
        location: "CA",
        applicationdate: "2023-10-01",
        status: "applied",
        joburl: "",
        notes: "",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    appId = res.body.id;
  });

  it("should get applications", async () => {
    const res = await request(app)
      .get("/applications")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update an application", async () => {
    const res = await request(app)
      .put(`/applications/${appId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        companyname: "Apple Inc.",
        jobtitle: "Senior Developer",
        location: "CA",
        applicationdate: "2023-10-01",
        status: "interviewing",
        joburl: "",
        notes: "Updated",
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("interviewing");
  });

  it("should delete an application", async () => {
    const res = await request(app)
      .delete(`/applications/${appId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
