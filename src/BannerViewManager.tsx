import React from 'react';
import {
  requireNativeComponent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type AdType = 'large' | 'standard';

export interface NativeBannerViewProps {
  size: number;
  onAdPress: Function;
  onAdError: Function;
  onAdLoad: Function;
  style: StyleProp<ViewStyle>;
  placementId: string;
}

export interface BannerViewProps {
  type: AdType;
  placementId: string;
  onPress: Function;
  onError: Function;
  onLoad: Function;
  style: StyleProp<ViewStyle>;
}

// tslint:disable-next-line:variable-name
const CTKBannerView =
  requireNativeComponent<NativeBannerViewProps>('CTKBannerView');

const sizeForType: Record<AdType, number> = {
  large: 90,
  standard: 50,
};

const getSizeForType = (type: AdType) => sizeForType[type];

// tslint:disable-next-line:variable-name
const BannerView = (props: BannerViewProps) => {
  const { type, onPress, onError, onLoad, style, ...restProps } = props;
  const size = getSizeForType(type);

  return (
    <CTKBannerView
      size={size}
      onAdPress={onPress}
      onAdError={onError}
      onAdLoad={onLoad}
      style={[style, { height: size }]}
      {...restProps}
    />
  );
};

export default BannerView;
