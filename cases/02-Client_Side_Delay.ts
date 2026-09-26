import { Page, expect } from '@playwright/test';

export async function ClientSideDelay(page: Page): Promise<void> {
  await page.goto('/#/topics/client-side-delay');

  const result = page.getByTestId('result');

  await page.getByTestId('start').click();
  await result.waitFor();

  await expect(result).toHaveText(/^Computation complete · \d+ ops finished$/);
}