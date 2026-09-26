import { Page, expect } from '@playwright/test';

export async function AjaxData(page: Page): Promise<void> {
  await page.goto('/#/topics/ajax-data');

  const fetchButton = page.getByTestId('fetch');
  const ajaxData = page.getByTestId('ajax-data');

  await fetchButton.waitFor({ timeout: 60_000 });

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes('httpbin.org/delay')),
    fetchButton.click(),
  ]);

  const responseBody = await response.json();
  const records = JSON.parse(responseBody.data).records;

  await expect(ajaxData).toHaveAttribute('data-count', String(records.length));
  await expect(ajaxData).toContainText('200 OK');
}