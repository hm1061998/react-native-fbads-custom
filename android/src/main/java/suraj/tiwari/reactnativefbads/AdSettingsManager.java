package suraj.tiwari.reactnativefbads;

import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.FacebookSdk;
import com.facebook.ads.AdSettings;
import com.facebook.ads.AudienceNetworkAds;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;
import java.util.HashSet;

public class AdSettingsManager extends ReactContextBaseJavaModule implements LifecycleEventListener {
    final static private String TAG = AdSettingsManager.class.getName();

    private HashSet<String> mTestDeviceHashes = new HashSet<>();
    private boolean mIsChildDirected = false;
    private String mMediationService = null;
    private String mUrlPrefix = null;

    public AdSettingsManager(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "CTKAdSettingsManager";
    }

    @ReactMethod
    public void init() {
      ReactApplicationContext reactContext = this.getReactApplicationContext();
      AudienceNetworkAds.initialize(reactContext);
    }
    @ReactMethod
    public void addTestDevice(String deviceHash) {
        AdSettings.addTestDevice(deviceHash);
        mTestDeviceHashes.add(deviceHash);
    }

    @ReactMethod
    public void clearTestDevices() {
        AdSettings.clearTestDevices();
        mTestDeviceHashes.clear();
    }

    @ReactMethod
    public void setLogLevel(String logLevel) {
        Log.w(TAG, "This method is not supported on Android");
    }

    @ReactMethod
    public void setIsChildDirected(boolean isChildDirected) {
        AdSettings.setMixedAudience(isChildDirected);
        mIsChildDirected = isChildDirected;
    }

    @ReactMethod
    public void setMediationService(String mediationService) {
        AdSettings.setMediationService(mediationService);
        mMediationService = mediationService;
    }

    @ReactMethod
    public void setUrlPrefix(String urlPrefix) {
        AdSettings.setUrlPrefix(urlPrefix);
        mUrlPrefix = urlPrefix;
    }

    @ReactMethod
    public void setAdvertiserIDCollectionEnabled(boolean enabled) {
        FacebookSdk.setAdvertiserIDCollectionEnabled(enabled);
    }

    private void restoreSettings() {
        for (String hash: mTestDeviceHashes) {
            AdSettings.addTestDevice(hash);
        }

        AdSettings.setMixedAudience(mIsChildDirected);
        AdSettings.setMediationService(mMediationService);
        AdSettings.setUrlPrefix(mUrlPrefix);
    }

    private void clearSettings() {
        AdSettings.clearTestDevices();
        AdSettings.setMixedAudience(false);
        AdSettings.setMediationService(null);
        AdSettings.setUrlPrefix(null);
    }

    @Override
    public void onHostResume() {
      restoreSettings();
    }

    @Override
    public void onHostPause() {
      clearSettings();
    }

    @Override
    public void onHostDestroy() {
      clearSettings();
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        SharedPreferences sp = getReactApplicationContext().getSharedPreferences("FBAdPrefs", 0);
        String deviceHashedId = sp.getString("deviceIdHash", null);

        constants.put("currentDeviceHash", deviceHashedId);

        return constants;
    }
}
