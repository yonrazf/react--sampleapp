import { test, expect } from "@playwright/test";
import { LoginPage } from "./loginSetup";
import { createDummyUser } from "./mocks/frontegg-mocks";

test.describe("Authenticated User Tests", () => {
  test("Should display home page for authenticated user", async ({
    page,
    context,
  }) => {
    page.on("console", (msg) => {
      console.log(`Console log: ${msg.type()}: ${msg.text()}`);
    });
    try {
      await page.goto("/");

      const loginButton = page.locator("text=Login");
      await expect(loginButton).toBeVisible();

      await page.click('button[id="login"]');
      const loginHandler = new LoginPage(page);
      loginHandler.loginInWithPasswordAndSSO();

      await page.locator("id=page-title").waitFor();
      await expect(page.locator("id=page-title")).toHaveText("Sample app");
    } catch (err) {
      console.log(err);
    }
  });
});

test.describe("Authenticated Mock test", () => {
  test("should receive mock user token", async ({ page, context }) => {
    const dummyUser = createDummyUser({
      name: "Mocked User",
      email: "mocked+user@frontegg.com",
      tenantData: { name: "Mocked Tenant Name" },
    });

    await page.route(
      "**/frontegg/identity/resources/auth/v1/user/token/refresh",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(dummyUser.refreshTokenResponse),
        })
    );

    await page.route("**/frontegg/identity/resources/users/v2/me", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(dummyUser.meResponse),
      })
    );

    await page.route(
      "**/frontegg/identity/resources/users/v1/me/authorization",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            roles: dummyUser.meResponse.roles,
            permissions: dummyUser.meResponse.permissions,
          }),
        })
    );

    await page.route(
      "**/frontegg/identity/resources/users/v3/me/tenants",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(dummyUser.tenantsResponse),
        })
    );

    await page.goto("/");

    await expect(page.locator("text=Mocked User")).toBeVisible();
  });
});
