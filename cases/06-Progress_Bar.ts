import { Page, expect } from '@playwright/test';

export async function ProgressBar(page: Page): Promise<void> {
  await page.goto('/#/topics/progress-bar');

  await page.getByTestId('start').click();

  await page.waitForFunction(
    () => Number(document.querySelector('[data-testid="progress-bar"]')?.getAttribute('aria-valuenow')) >= 75,
    { polling: 'raf' }
  );

  await page.getByTestId('stop').click();

  await expect(page.getByTestId('result')).toHaveText('✓ Stopped at exactly 75%.');
}