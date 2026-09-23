import { expect, test } from "@playwright/test";
test("landing page exposes workshop discovery", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Explore workshops" }),
  ).toBeVisible();
});
test.fixme("authenticated role journeys", async () => {
  /* P1 supplies deterministic test authentication. */
});
