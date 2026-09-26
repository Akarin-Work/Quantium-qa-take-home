import { Page, expect } from '@playwright/test';

export async function ShadowDom(page: Page): Promise<void> {
  await page.goto('/#/topics/shadow-dom');

  const inputField = page.getByTestId('shadow-input');
  const textInput = 'Test automation fill text';

  await inputField.click();
  await inputField.fill(textInput);
  await page.getByTestId('shadow-submit').click();

  await expect(page.getByTestId('shadow-result')).toHaveText(`✓ Submitted: ${textInput}`);
  await expect(page.getByTestId('outer-echo')).toHaveText(`Outer page received: ${textInput}`);
}