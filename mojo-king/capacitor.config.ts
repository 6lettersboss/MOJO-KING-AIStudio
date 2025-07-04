// You need to install capacitor: npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
// Then run `npx cap init` if you want to configure it yourself.

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mojoking.app',
  appName: 'MOJO KING',
  webDir: '.', // Serve files from the root directory where index.html is
  // bundledWebRuntime: false, // Not using a bundler like Webpack/Vite
  
  // Server configuration for live reload, if you set up a local dev server
  // server: {
  //   url: 'http://192.168.1.100:8080', // Replace with your local IP and port
  //   cleartext: true
  // },

  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      // IMPORTANT: Create a 2732x2732px splash screen image at the path below
      androidSplashResourceName: "splash",
      iosSplashResourceName: "Splash",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
  
  // IMPORTANT: Create a 1024x1024px icon file at 'assets/icon.png' and a 2732x2732px splash screen file at 'assets/splash.png'.
  // Then run `npx @capacitor/assets generate` to create all platform-specific icons and splash screens.
  // See: https://capacitorjs.com/docs/guides/splash-screens-and-icons
  ios: {},
  android: {}
};

export default config;
