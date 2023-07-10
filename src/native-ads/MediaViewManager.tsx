import React from 'react';
import { requireNativeComponent, type ViewProps } from 'react-native';
import {
  type ComponentOrClass,
  MediaViewContext,
  type MediaViewContextValueType,
} from './contexts';

export type MediaViewProps = ViewProps;

// tslint:disable-next-line:variable-name
export const NativeMediaView =
  requireNativeComponent<MediaViewProps>('MediaView');

class MediaViewChild extends React.Component<
  MediaViewProps & MediaViewContextValueType
> {
  mediaView: ComponentOrClass | null = null;

  handleMediaViewMount = (ref: ComponentOrClass | null) => {
    if (this.mediaView) {
      this.props.unregister();
      this.mediaView = null;
    }

    if (ref) {
      this.props.register(ref);
      this.mediaView = ref;
    }
  };

  render() {
    return <NativeMediaView {...this.props} ref={this.handleMediaViewMount} />;
  }
}

export default class MediaView extends React.Component<MediaViewProps> {
  render() {
    return (
      <MediaViewContext.Consumer>
        {(contextValue: MediaViewContextValueType) => (
          <MediaViewChild {...this.props} {...contextValue} />
        )}
      </MediaViewContext.Consumer>
    );
  }
}
