import { reloadApp } from 'detox-expo-helpers';

describe('WelcomeScreen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await reloadApp();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('WelcomeScreen'))).toBeVisible();
  });
});
