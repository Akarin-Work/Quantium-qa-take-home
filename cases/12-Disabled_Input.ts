import { Page, expect } from '@playwright/test';

export async function DisabledInput(page: Page): Promise<void> {
  await page.goto('/#/topics/disabled-input');

  const activateButton = page.getByTestId('activate');
  const inputField = page.getByTestId('disabled-input');
  const result = page.getByTestId('result');
  const textInput = 'Test automation fill text';

  await activateButton.click();
  await inputField.fill(textInput);

  await expect(result).toHaveText(`✓ Captured: ${textInput}`);
}