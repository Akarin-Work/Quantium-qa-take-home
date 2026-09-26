import { Page, expect } from '@playwright/test';

export async function TextInput(page: Page): Promise<void> {
  await page.goto('/#/topics/text-input');

  const updateButton = page.getByTestId('update-button');
  const textInput = 'Test input text';

  await page.getByTestId('text-input').fill(textInput);
  await updateButton.click();

  await expect(updateButton).toHaveText(textInput);
}