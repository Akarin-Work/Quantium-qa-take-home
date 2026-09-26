import { Page, expect } from '@playwright/test';

const days = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

export async function ChartInteraction(page: Page): Promise<void> {
  await page.goto('/#/topics/chart-interaction');

  const bars = page.locator('svg rect[fill="#4f46e5"]');
  await expect(bars).toHaveCount(7);

  for (let i = 0; i < days.length; i++) {
    const { key, label } = days[i];
    const expectedText = await page.getByTestId(`expected-${key}`).textContent();
    const expectedValue = expectedText?.match(/\d+/)?.[0];
    if (!expectedValue) throw new Error(`Could not find the expected value for ${label} in "${expectedText}"`);

    await bars.nth(i).hover();

    await expect(page.getByTestId('hovered-value')).toHaveText(
      `Hovering ${label} · value ${expectedValue}`
    );
  }
}