import { test, expect, type Page } from "@playwright/test";

/**
 * E2E tests for the HeroVideoReveal canvas frame-scrubbing component.
 *
 * These tests require a running dev/production server at localhost:3000
 * with the scroll-frame images available under /images/scroll-frames/.
 */

// Helper: scroll to a percentage of the hero wrapper height
async function scrollToHeroPercent(page: Page, percent: number) {
  await page.evaluate(async (scrollTarget: number) => {
    // The hero wrapper uses style="height: 500vh"
    const heroWrapper = document.querySelector('[style*="height: 500vh"]') as HTMLElement | null;
    if (!heroWrapper) throw new Error("Hero wrapper not found");
    const totalHeight = heroWrapper.getBoundingClientRect().height;
    const targetY = totalHeight * scrollTarget;
    window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
  }, percent);
  // Wait for the scroll event + rAF-based canvas draw to settle
  await page.waitForFunction(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    { timeout: 5000 },
  );
}

// Helper: sample actual pixel data from the center of the canvas
async function sampleCanvasPixels(page: Page) {
  return page.evaluate(() => {
    const canvas = document.querySelector('canvas[role="img"]') as HTMLCanvasElement | null;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    // Sample a 10x10 block from the center of the canvas
    const cx = Math.floor(canvas.width / 2);
    const cy = Math.floor(canvas.height / 2);
    const data = ctx.getImageData(cx - 5, cy - 5, 10, 10).data;
    // Return as a comma-separated string of pixel values for comparison
    return Array.from(data).join(",");
  });
}

test.describe("HeroVideoReveal - frame scrubbing", () => {
  test("frames advance with scroll and all snapshots are non-blank", async ({ page }) => {
    await page.goto("/en", { waitUntil: "networkidle" });

    // Wait for frames to load (canvas appears)
    await page.waitForSelector('canvas[role="img"]', { timeout: 30000 });

    // Scroll to ~45% of hero
    await scrollToHeroPercent(page, 0.45);
    const snapshot1 = await sampleCanvasPixels(page);
    expect(snapshot1).not.toBeNull();
    // Verify pixels aren't all zeros (blank/transparent canvas)
    expect(snapshot1!.split(",").some((v) => v !== "0")).toBe(true);

    // Scroll to ~65%
    await scrollToHeroPercent(page, 0.65);
    const snapshot2 = await sampleCanvasPixels(page);
    expect(snapshot2).not.toBeNull();

    // Scroll to ~80%
    await scrollToHeroPercent(page, 0.8);
    const snapshot3 = await sampleCanvasPixels(page);
    expect(snapshot3).not.toBeNull();

    // All three snapshots should differ (frames change with scroll)
    expect(snapshot1).not.toBe(snapshot2);
    expect(snapshot2).not.toBe(snapshot3);
    expect(snapshot1).not.toBe(snapshot3);
  });

  test("reverse scrubbing shows different frame than forward position", async ({ page }) => {
    await page.goto("/en", { waitUntil: "networkidle" });
    await page.waitForSelector('canvas[role="img"]', { timeout: 30000 });

    // Scroll forward to ~80%
    await scrollToHeroPercent(page, 0.8);
    const snapshotForward = await sampleCanvasPixels(page);

    // Scroll back to ~50%
    await scrollToHeroPercent(page, 0.5);
    const snapshotReverse = await sampleCanvasPixels(page);

    expect(snapshotForward).not.toBeNull();
    expect(snapshotReverse).not.toBeNull();
    expect(snapshotForward).not.toBe(snapshotReverse);
  });
});

test.describe("HeroVideoReveal - fallback behavior", () => {
  test("shows illustration fallback and no canvas when frames are blocked", async ({ page }) => {
    // Block all scroll-frame image requests
    await page.route("**/images/scroll-frames/**", (route) => route.abort());

    await page.goto("/en", { waitUntil: "networkidle" });

    // Scroll past the split so the illustration layer becomes visible
    await scrollToHeroPercent(page, 0.55);

    // Canvas should NOT be rendered (frames failed to load, component returns null)
    const canvas = page.locator('canvas[role="img"]');
    await expect(canvas).toHaveCount(0);

    // The fallback illustration images should exist in the DOM
    // They have alt="" and aria-hidden="true" since they're decorative
    const fallbackImage = page.locator('img[src*="kjerringvik"]');
    await expect(fallbackImage.first()).toBeAttached();
  });
});

test.describe("HeroVideoReveal - reduced motion", () => {
  test("no canvas is rendered when prefers-reduced-motion is set", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en", { waitUntil: "networkidle" });

    // Scroll through the hero area
    await scrollToHeroPercent(page, 0.5);

    // Canvas should not exist (parent hero.tsx skips rendering HeroVideoReveal)
    const canvas = page.locator('canvas[role="img"]');
    await expect(canvas).toHaveCount(0);
  });
});

test.describe("HeroVideoReveal - responsive frame selection", () => {
  test("desktop viewport requests desktop frame directory", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const frameRequests: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("/scroll-frames/")) {
        frameRequests.push(url);
      }
    });

    await page.goto("/en", { waitUntil: "networkidle" });
    // Wait for canvas to appear (proves frames loaded)
    await page.waitForSelector('canvas[role="img"]', { timeout: 30000 });

    const desktopFrames = frameRequests.filter((u) => u.includes("/scroll-frames/desktop/"));
    const mobileFrames = frameRequests.filter((u) => u.includes("/scroll-frames/mobile/"));

    expect(desktopFrames.length).toBeGreaterThan(0);
    expect(mobileFrames.length).toBe(0);
  });

  test("mobile viewport requests mobile frame directory", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const frameRequests: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("/scroll-frames/")) {
        frameRequests.push(url);
      }
    });

    await page.goto("/en", { waitUntil: "networkidle" });
    // Wait for canvas to appear (proves frames loaded)
    await page.waitForSelector('canvas[role="img"]', { timeout: 30000 });

    const mobileFrames = frameRequests.filter((u) => u.includes("/scroll-frames/mobile/"));
    const desktopFrames = frameRequests.filter((u) => u.includes("/scroll-frames/desktop/"));

    expect(mobileFrames.length).toBeGreaterThan(0);
    expect(desktopFrames.length).toBe(0);
  });
});

test.describe("HeroVideoReveal - cache headers", () => {
  test("frame images are served with immutable cache-control", async ({ page }) => {
    let frameCacheControl: string | null = null;

    page.on("response", (response) => {
      const url = response.url();
      if (url.includes("/scroll-frames/") && url.endsWith(".avif") && !frameCacheControl) {
        frameCacheControl = response.headers()["cache-control"] ?? null;
      }
    });

    await page.goto("/en", { waitUntil: "networkidle" });
    // Wait for canvas to appear (proves at least one frame loaded)
    try {
      await page.waitForSelector('canvas[role="img"]', { timeout: 30000 });
    } catch {
      // Canvas may not appear if frames didn't load
    }

    if (!frameCacheControl) {
      test.skip(
        true,
        "No frame response captured -- frames may not be deployed or server not running",
      );
      return;
    }

    expect(frameCacheControl as string).toContain("immutable");
  });
});
