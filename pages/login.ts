import { Page } from '@playwright/test';
import { settings } from '../config/settings';

export class Login {
  constructor(private page: Page) {}

  async run(): Promise<void> {
    await this.page.goto('/#/login');
    await this.page.locator('#username').fill(settings.username);
    await this.page.locator('#password').fill(settings.password);
    await this.page.getByRole('button', { name: /sign in|log in/i }).click();
    await this.page.waitForURL(/#\/home/);
  }
}