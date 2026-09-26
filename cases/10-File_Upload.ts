import { Page, expect } from '@playwright/test';
import path from 'path';

export async function FileUpload(page: Page): Promise<void> {
  await page.goto('/#/topics/file-upload');

  const filePath = path.join(__dirname, '../test-data/sample.txt');
  await page.getByTestId('file-input').setInputFiles(filePath);

  await expect(page.getByTestId('uploaded-files')).toContainText('sample.txt');
}