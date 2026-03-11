import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
  test("Login page matches baseline", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await expect(page).toHaveScreenshot("login-page.png");
  });

  test("Applications list matches baseline", async ({ page }) => {
    // Login first
    await page.goto("http://localhost:5173/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Navigate to applications
    await page.goto("http://localhost:5173/applications"); // Adjust route
    await expect(page).toHaveScreenshot("applications-list.png");
  });
});
