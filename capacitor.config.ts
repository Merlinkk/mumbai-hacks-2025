import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nirmayahealth.app',
  appName: 'nirmayahealth',
  webDir: 'out',
  plugins: {
    StatusBar: {
      // Light mode (dark icons on light background)
      style: 'light',
      backgroundColor: '#FFFFFF'
    }
  }
};

export default config;
