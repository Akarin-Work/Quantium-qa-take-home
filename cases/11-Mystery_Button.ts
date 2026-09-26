import { Page, expect } from '@playwright/test';

export async function MysteryButton(page: Page): Promise<void> {
  await page.goto('/#/topics/mystery-button');

  const counter = page.getByTestId('outer-counter');
  const before = Number(await counter.getAttribute('data-count'));

  const frame = page.frameLocator('iframe');
  await frame.getByTestId('frame-button').click();

  await expect(counter).toHaveAttribute('data-count', String(before + 1));
}