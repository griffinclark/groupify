import { reloadApp } from 'detox-expo-helpers';

describe('WelcomeScreen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await reloadApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('WelcomeScreen'))).toBeVisible();
  });
});
