import * as React from 'react';

import { StyleSheet, View, Text, NativeModules } from 'react-native';
import { BannerView } from 'react-native-fbads-custom';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(fbads)}</Text> */}
      <BannerView
        placementId="YOUR_BANNER_PLACEMENT_ID"
        type="standard"
        onPress={() => console.log('click')}
        onLoad={() => console.log('loaded')}
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
