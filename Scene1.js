import React, { Component, PropTypes } from 'react';
import { TouchableNativeFeedback, View, Text, TouchableHighlight } from 'react-native';

export default class Scene1 extends Component {


  render() {
    return (
      <View>
        <Text>This is Scene111</Text>
      </View>
    )
  }

  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   routeIndex: PropTypes.number.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }
}