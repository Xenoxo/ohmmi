import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Text, TouchableHighlight } from 'react-native';

import CountdownTimer from './CountdownTimer';

import Sound from 'react-native-sound'; //for the bell sound

export default class MeditationTimerScene extends Component {
  constructor(props){
    super(props);
    this.state = {
      userSetTime: this.props.timeAmount,
    }
  }

  playSound() {
    let s = new Sound('bell.wav','', (e) => {
      if (e) {
        console.log('error', e);
      } else {
        console.log('duration', s.getDuration());
        s.play();
      }
    });
  }    

  timerDone() {
    this.props.navigator.pop();
  }

  render() {
    var date = Date.now();
    return (
        <CountdownTimer 
          interval={25}
          initialTimeRemaining={this.state.userSetTime}
          completeCallback={this.timerDone.bind(this)}
          completedSound={this.playSound.bind(this)}
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
