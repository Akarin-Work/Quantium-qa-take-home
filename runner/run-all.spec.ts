import { test } from '@playwright/test';
import { Login } from '../pages/login';
import { TextInput } from '../cases/01-Text_Input';
import { ClientSideDelay } from '../cases/02-Client_Side_Delay';
import { AjaxData } from '../cases/03-Ajax_Data';
import { Scrollbars } from '../cases/04-Scrollbars';
import { DynamicTable } from '../cases/05-Dynamic_Table';
import { ProgressBar } from '../cases/06-Progress_Bar';
import { Visibility } from '../cases/07-Visibility';
import { OverlappedElement } from '../cases/08-Overlapped_Element';
import { ShadowDom } from '../cases/09-Shadow_Dom';
import { FileUpload } from '../cases/10-File_Upload';
import { MysteryButton } from '../cases/11-Mystery_Button';
import { DisabledInput } from '../cases/12-Disabled_Input';
import { ChartInteraction } from '../cases/13-Chart_Interaction';
import { AutoWait } from '../cases/14-Auto_Wait';

test.beforeEach(async ({ page }) => {
  await new Login(page).run();
});

test('01 Text Input: fills the input and confirms the button label updates to match', async ({ page }) => {
  await TextInput(page);
});

test('02 Client Side Delay: waits for the async computation to finish before asserting', async ({ page }) => {
  test.setTimeout(90_000);
  await ClientSideDelay(page);
});

test('03 Ajax Data: fetches real data and verifies the record count and status', async ({ page }) => {
  await AjaxData(page);
});

test('04 Scrollbars: scrolls the off-screen target into view and clicks it', async ({ page }) => {
  await Scrollbars(page);
});

test('05 Dynamic Table: reads the CPU value by column identity, not position', async ({ page }) => {
  await DynamicTable(page);
});

test('06 Progress Bar: stops the animated bar at exactly 75%', async ({ page }) => {
  await ProgressBar(page);
});

test('07 Visibility: detects every way an element can be hidden', async ({ page }) => {
  await Visibility(page);
});

test('08 Overlapped Element: clicks through a sticky header to fill the field underneath', async ({ page }) => {
  await OverlappedElement(page);
});

test('09 Shadow Dom: fills and submits a field inside a shadow root', async ({ page }) => {
  await ShadowDom(page);
});

test('10 File Upload: uploads a file directly via the hidden input', async ({ page }) => {
  await FileUpload(page);
});

test('11 Mystery Button: clicks a button inside an iframe and confirms the parent updates', async ({ page }) => {
  await MysteryButton(page);
});

test('12 Disabled Input: waits for the field to become enabled before typing', async ({ page }) => {
  await DisabledInput(page);
});

test('13 Chart Interaction: hovers each bar and verifies the readout matches the expected value', async ({ page }) => {
  await ChartInteraction(page);
});

test('14 Auto Wait: clicks the target only once it reaches the truly ready state', async ({ page }) => {
  await AutoWait(page);
});
