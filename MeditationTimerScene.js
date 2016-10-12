import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Text, TouchableHighlight } from 'react-native';

import CountdownTimer from './CountdownTimer';

export default class MeditationTimerScene extends Component {
  constructor(props){
    super(props);
    this.state = {
      userSetTime: 14000,
    }
  }

  timerDone() {
    this.props.navigator.pop();
  }

  render() {
    var date = Date.now();
    return (
      <View>
        <CountdownTimer 
          interval={50}
          initialTimeRemaining={this.state.userSetTime}
          completeCallback={this.timerDone.bind(this)}
        />
        <Text>{this.props.timeAmount}</Text>
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
