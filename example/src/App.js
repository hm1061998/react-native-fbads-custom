import * as React from 'react';
import { TouchableHighlight } from 'react-native';

import { StyleSheet, View, Text, NativeModules } from 'react-native';
import {
  BannerView,
  AdSettings,
  InterstitialAdManager,
} from 'react-native-fbads-custom';

// AdSettings.init();
AdSettings.setLogLevel('debug');
AdSettings.addTestDevice(AdSettings.currentDeviceHash);

const { CTKInterstitialAdManager } = NativeModules;
export default function App() {
  // console.log('====================================');
  // console.log('run', InterstitialAdManager);
  // console.log('====================================');

  const showAD = () => {
    InterstitialAdManager.showAd('IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID')
      .then(() => {
        console.log('loaded');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={showAD}>
        <Text>show ad</Text>
      </TouchableHighlight>
      <BannerView
        placementId={'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID'}
        type="standard"
        onPress={() => console.log('click')}
        onError={(err) => console.log('error', err)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
