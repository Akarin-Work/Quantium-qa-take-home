import { Page, expect } from '@playwright/test';

export async function DynamicTable(page: Page): Promise<void> {
  await page.goto('/#/topics/dynamic-table');

  const summaryText = await page.getByTestId('chrome-cpu-label').innerText();
  const expected = summaryText.match(/[\d.]+%/)?.[0];
  if (!expected) throw new Error(`Could not find the expected CPU value in the text "${summaryText}"`);

  const cpuCell = page.locator('[data-testid="row-chrome"] [data-col="cpu"]');

  await expect(cpuCell).toHaveText(expected);
}