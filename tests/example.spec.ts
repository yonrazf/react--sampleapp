import { test, expect } from "@playwright/test";
import { LoginPage } from "./loginSetup";
import { createDummyUser } from "./mocks/frontegg-mocks";
import axios from "axios";

const clientId = process.env.VITE_FE_CLIENT_ID;
const testClientId = process.env.VITE_FE_CLIENT_ID_TEST;
const apiKey = process.env.VITE_FE_API_KEY;

export async function getToken() {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ clientId, secret: apiKey }),
  };

  const response = await fetch(
    "https://api.frontegg.com/auth/vendor/",
    options
  );
  const data = await response.json();
  return data.token;
}

const MY_CUSTOM_DOMAIN = "auth.sabich.life";
const testUserId = "8cc66a38-0195-4295-918b-9740f08f40b3";

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

test.describe("use a session to be already logged in", () => {
  test("should get token and access localhost:5173 as authenticated", async ({
    page,
    context,
  }) => {
    const token = await getToken();
    console.log(token);
    const sessionResponse = await axios.post(
      "https://api.frontegg.com/identity/resources/auth/v1/vendor-only/user/session",
      {
        userId: testUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(sessionResponse.data);
    const { refreshToken } = sessionResponse.data;
    console.log("refresh token" + refreshToken);

    const refreshTokenResponse = await axios.post(
      `https://${MY_CUSTOM_DOMAIN}/identity/resources/auth/v2/user/token/refresh`,
      {},
      {
        headers: {
          Cookie: `fe_refresh_${testClientId}=${refreshToken}`,
        },
      }
    );

    console.log(refreshTokenResponse.data);
    const { refreshToken: newRefreshToken } = refreshTokenResponse.data.auth;

    await context.addCookies([
      {
        name: `fe_refresh_${testClientId}`,
        value: newRefreshToken,
        domain: "." + MY_CUSTOM_DOMAIN,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "None",
      },
    ]);

    await page.goto("/account");

    await expect(page.locator("text=yonatan")).toBeVisible();
  });
});
