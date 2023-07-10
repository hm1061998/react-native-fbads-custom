import AdSettings from './AdSettings';
import NativeAdsManager from './native-ads/NativeAdsManager';
import withNativeAd, {
  type AdWrapperProps,
  type AdWrapperState,
  type NativeAdViewProps,
} from './native-ads/withNativeAd';
import InterstitialAdManager from './InterstitialAdManager';
import BannerView, { type BannerViewProps } from './BannerViewManager';
import MediaView from './native-ads/MediaViewManager';
import AdIconView from './native-ads/AdIconViewManager';
import TriggerableView from './native-ads/TriggerableView';
import AdChoicesView from './native-ads/AdChoicesManager';
export type * from './native-ads/nativeAd';

export type {
  AdWrapperProps,
  AdWrapperState,
  BannerViewProps,
  NativeAdViewProps,
};

export {
  withNativeAd,
  AdSettings,
  NativeAdsManager,
  InterstitialAdManager,
  BannerView,
  MediaView,
  AdIconView,
  TriggerableView,
  AdChoicesView,
};

const fbAds = {
  withNativeAd,
  AdSettings,
  NativeAdsManager,
  InterstitialAdManager,
  BannerView,
  MediaView,
  AdIconView,
  TriggerableView,
  AdChoicesView,
};

export default fbAds;
