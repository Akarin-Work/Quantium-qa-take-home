import { Page, expect } from '@playwright/test';

async function isActuallyVisible(page: Page, testId: string): Promise<boolean> {
  return page.evaluate((tid) => {
    const el = document.querySelector(`[data-testid="${tid}"]`) as HTMLElement | null;
    if (!el) return false;

    const style = getComputedStyle(el);
    if (style.display === 'none') return false;
    if (style.visibility === 'hidden') return false;
    if (Number(style.opacity) === 0) return false;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return false;
    if (rect.bottom < 0 || rect.right < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth) return false;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const topElement = document.elementFromPoint(centerX, centerY);
    return el === topElement || el.contains(topElement);
  }, testId);
}

export async function Visibility(page: Page): Promise<void> {
  await page.goto('/#/topics/visibility');

  const hideButtons = ['hide-display', 'hide-visibility', 'hide-opacity', 'hide-offscreen', 'hide-zero-size', 'hide-covered'];

  for (const hideId of hideButtons) {
    await page.getByTestId(hideId).click();

    expect(await isActuallyVisible(page, 'target'), `target should be hidden after clicking ${hideId}`).toBe(false);

    await page.getByTestId('visibility-reset').click();
  }
}