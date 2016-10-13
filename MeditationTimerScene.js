import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Text, TouchableHighlight } from 'react-native';

import CountdownTimer from './CountdownTimer';

export default class MeditationTimerScene extends Component {
  constructor(props){
    super(props);
    this.state = {
      userSetTime: this.props.timeAmount,
    }
  }

  timerDone() {
    this.props.navigator.pop();
  }

  render() {
    var date = Date.now();
    return (
        <CountdownTimer 
          interval={50}
          initialTimeRemaining={this.state.userSetTime}
          completeCallback={this.timerDone.bind(this)}
        />
    )
  }

  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   routeIndex: PropTypes.number.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }

}
