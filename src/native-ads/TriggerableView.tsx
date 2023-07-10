import React from 'react';
import { Text, type TextProps, View } from 'react-native';
import {
  TriggerableContext,
  type TriggerableContextValueType,
} from './contexts';

class TriggerableViewChild extends React.Component<
  TextProps & TriggerableContextValueType
> {
  wrapperRef: View | null = null;

  handleWrapperRef = (ref: View) => {
    if (this.wrapperRef) {
      this.props.unregister(this.wrapperRef);
      this.wrapperRef = null;
    }

    if (ref) {
      this.props.register(ref);
      this.wrapperRef = ref;
    }
  };

  render() {
    return <Text {...this.props} ref={this.handleWrapperRef} />;
  }
}

export default class TriggerableView extends React.Component<TextProps> {
  render() {
    return (
      <TriggerableContext.Consumer>
        {(contextValue: TriggerableContextValueType) => (
          <TriggerableViewChild {...this.props} {...contextValue} />
        )}
      </TriggerableContext.Consumer>
    );
  }
}
