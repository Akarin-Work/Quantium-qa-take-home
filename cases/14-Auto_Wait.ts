import { Page, expect } from '@playwright/test';

export async function AutoWait(page: Page): Promise<void> {
  await page.goto('/#/topics/auto-wait');

  const startSequence = page.getByTestId('start');
  const targetButton = page.getByRole('button', { name: 'Click me now' });
  const result = page.getByTestId('result');

  await startSequence.click();
  await targetButton.click();

  await expect(result).toHaveText('✓ Target clicked exactly once at the right moment.');
}