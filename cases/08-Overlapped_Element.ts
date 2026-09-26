import { Page, expect } from '@playwright/test';

export async function OverlappedElement(page: Page): Promise<void> {
  await page.goto('/#/topics/overlapped-element');

  const emailField = page.getByTestId('overlapped-input');
  const email = 'qa.tester@example.com';

  await emailField.click();
  await emailField.fill(email);

  await expect(page.getByTestId('result')).toHaveText(`✓ Email captured: ${email}`);
}