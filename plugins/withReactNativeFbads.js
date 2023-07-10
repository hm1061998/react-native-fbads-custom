import {
  AndroidConfig,
  createRunOncePlugin,
  withAndroidManifest,
} from '@expo/config-plugins';
const { getMainApplicationOrThrow, prefixAndroidKeys } = AndroidConfig.Manifest;

const INTERSTITIAL_AD_ACTIVITY = 'com.facebook.ads.InterstitialAdActivity';

export const withFacebookManifest = (config) => {
  return withAndroidManifest(config, (config) => {
    config.modResults = setFacebookConfig(config.modResults);
    return config;
  });
};

export function setFacebookConfig(androidManifest) {
  let mainApplication = getMainApplicationOrThrow(androidManifest);
  mainApplication = ensureFacebookActivity({ mainApplication });

  return androidManifest;
}

function ensureFacebookActivity({ mainApplication }) {
  if (Array.isArray(mainApplication.activity)) {
    // Remove all Facebook InterstitialAdActivity first
    mainApplication.activity = mainApplication.activity.filter((activity) => {
      return activity.$?.['android:name'] !== INTERSTITIAL_AD_ACTIVITY;
    });
  } else {
    mainApplication.activity = [];
  }

  mainApplication.activity.push(getFacebookAdActivity());
  return mainApplication;
}

function buildXMLItem({ head, children }) {
  return { ...(children ?? {}), $: head };
}

function getFacebookAdActivity() {
  /**
<activity
  android:name="com.facebook.ads.InterstitialAdActivity"
  android:configChanges="keyboardHidden|orientation"
/>
   */
  return buildXMLItem({
    head: prefixAndroidKeys({
      name: INTERSTITIAL_AD_ACTIVITY,
      configChanges: 'keyboardHidden|orientation',
    }),
  });
}

/**
 * Apply react-native-fbads configuration for Expo SDK 44 projects.
 */
const withReactNativeFbads = (config) => {
  return withFacebookManifest(config);
};

const pkg = require('react-native-fbads-custom/package.json');

exports.default = (0, createRunOncePlugin)(
  withReactNativeFbads,
  pkg.name,
  pkg.version
);
