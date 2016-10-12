import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Text, TouchableHighlight } from 'react-native';

import CountdownTimer from './CountdownTimer';

export default class MeditationTimerScene extends Component {
  constructor(props){
    super(props);
    this.state = {
      userSetTime: 60000,
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
          // textStyle={}
          completeCallback={this.timerDone.bind(this)}
        />     
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

/*{ if (this.props.routeIndex > 0) {}}

{ this.props.routeIndex == 0 ? (<Text>{this.props.routeIndex}</Text>) : '' }        


*/

/*



*/