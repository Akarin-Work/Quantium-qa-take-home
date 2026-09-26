import { Page, expect } from '@playwright/test';

export async function Scrollbars(page: Page): Promise<void> {
  await page.goto('/#/topics/scrollbars');

  const btn = page.getByTestId('scroll-target');
  await btn.scrollIntoViewIfNeeded();
  await btn.click();

  await expect(page.getByTestId('result')).toHaveText('✓ Target reached and clicked.');
}