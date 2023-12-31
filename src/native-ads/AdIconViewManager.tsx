import React from 'react';
import { requireNativeComponent, type ViewProps } from 'react-native';

import {
  AdIconViewContext,
  type AdIconViewContextValueType,
  type ComponentOrClass,
} from './contexts';

export type AdIconViewProps = ViewProps;

// tslint:disable-next-line:variable-name
export const NativeAdIconView =
  requireNativeComponent<AdIconViewProps>('AdIconView');

class AdIconViewChild extends React.Component<
  AdIconViewProps & AdIconViewContextValueType
> {
  iconView: ComponentOrClass | null = null;

  handleAdIconViewRef = (ref: ComponentOrClass | null) => {
    if (this.iconView) {
      this.props.unregister();
      this.iconView = null;
    }

    if (ref) {
      this.props.register(ref);
      this.iconView = ref;
    }
  };

  render() {
    return <NativeAdIconView {...this.props} ref={this.handleAdIconViewRef} />;
  }
}

export default class AdIconView extends React.Component<AdIconViewProps> {
  render() {
    return (
      <AdIconViewContext.Consumer>
        {(contextValue: AdIconViewContextValueType) => (
          <AdIconViewChild {...this.props} {...contextValue} />
        )}
      </AdIconViewContext.Consumer>
    );
  }
}
