import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'asap.app',
  appName: 'asap',
  webDir: 'www',
  plugins: {
    LiveUpdates: {
      appId: '6b1f76a6',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2,
    },
  },
};

export default config;
