import { test, expect } from "@playwright/test";

// Global setup to start the server before tests
test.beforeAll(async () => {
  // Assuming you have a script to start the server, or run it manually
  // For automation, you could use child_process to spawn the server
  // Example: const { spawn } = require('child_process'); const server = spawn('npm', ['run', 'dev'], { cwd: '../Server' });
  // Store server process and kill in afterAll
  console.log("Ensure server is running on http://localhost:3000");
});

test.describe("Job Application Tracker E2E Tests", () => {
  test("User Registration and Login Flow", async ({ page }) => {
    // Navigate to the client app
    await page.goto("http://localhost:5173"); // Adjust port if needed

    // Click register link
    await page.click("text=Sign up now!");

    // Fill registration form
    await page.fill('input[name="firstname"]', "Test");
    await page.fill('input[name="lastname"]', "User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Should redirect to home or login
    await expect(page).toHaveURL(/\/$/); // Assuming home route

    // Logout if needed, then login
    // Assuming logout button exists
    await page.click('button:has-text("Logout")');

    // Login
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Verify logged in (e.g., user info visible)
    await expect(page.locator("text=Test User")).toBeVisible();
  });

  test("Create and View Job Application", async ({ page }) => {
    // Assume user is logged in from previous test or login here
    await page.goto("http://localhost:5173/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Click to create application (assuming a button or link)
    await page.click('button:has-text("Create Application")');

    // Fill form
    await page.fill('input[name="companyname"]', "Google");
    await page.fill('input[name="jobtitle"]', "Software Engineer");
    await page.fill('input[name="location"]', "Remote");
    await page.fill('input[name="applicationdate"]', "2023-10-01");
    await page.selectOption('select[name="status"]', "Applied"); // Assuming select dropdown
    await page.fill('input[name="joburl"]', "https://careers.google.com");
    await page.fill('textarea[name="notes"]', "Excited for this role!");
    await page.click('button[type="submit"]');

    // Verify application appears in list
    await expect(page.locator("text=Google")).toBeVisible();
    await expect(page.locator("text=Software Engineer")).toBeVisible();
  });

  test("Edit Job Application", async ({ page }) => {
    // Login and navigate to applications
    await page.goto("http://localhost:5173/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Click edit on an application (assuming edit button)
    await page.click('button:has-text("Edit")'); // Adjust selector

    // Update fields
    await page.fill('input[name="jobtitle"]', "Senior Software Engineer");
    await page.click('button[type="submit"]');

    // Verify update
    await expect(page.locator("text=Senior Software Engineer")).toBeVisible();
  });

  test("Delete Job Application", async ({ page }) => {
    // Login
    await page.goto("http://localhost:5173/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Click delete (assuming delete button)
    await page.click('button:has-text("Delete")');
    // Confirm if there's a modal
    await page.click('button:has-text("Confirm")');

    // Verify deleted
    await expect(page.locator("text=Google")).not.toBeVisible();
  });

  test("Error Handling - Invalid Login", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.fill('input[name="email"]', "invalid@example.com");
    await page.fill('input[name="password"]', "wrongpass");
    await page.click('button[type="submit"]');

    // Check for error message
    await expect(page.locator("text=Invalid Email or Password")).toBeVisible();
  });
});
