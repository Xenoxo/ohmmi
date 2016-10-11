import React, { Component } from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';

import * as Progress from 'react-native-progress';

//
// Generic Countdown Timer UI component
//
// https://github.com/uken/react-countdown-timer
//
// props:
//   - initialTimeRemaining: Number
//       The time remaining for the countdown (in ms).
//
//   - interval: Number (optional -- default: 1000ms)
//       The time between timer ticks (in ms).
//
//   - formatFunc(timeRemaining): Function (optional)
//       A function that formats the timeRemaining.
//
//   - tickCallback(timeRemaining): Function (optional)
//       A function to call each tick.
//
//   - completeCallback(): Function (optional)
//       A function to call when the countdown completes.
//

export default class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: props.initialTimeRemaining,
      timeoutId: null,
      prevTime: null,
      originalTime: props.initialTimeRemaining,
      adjustTime: true,

      stopTimerProgress:0,
      stoptimerId: null,
    }
    this.displayName = 'CountdownTimer';
    this.getFormattedTime = this.getFormattedTime.bind(this);
    this.tick = this.tick.bind(this);
    this.isComponentMounted = false;
    this.shouldPause = false; // determines whether tick() fires, might be able to make it a state?
  }

  isMounted() {
    return this.isComponentMounted;
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.tick();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.timeoutId && !this.shouldPause) { 
      clearTimeout(this.state.timeoutId); 
    }
    this.setState({prevTime: null, timeRemaining: newProps.initialTimeRemaining});
  }

  componentDidUpdate() {
    if ((!this.state.prevTime) && (this.state.timeRemaining > 0) && this.isMounted() && !this.shouldPause) {
      this.tick();
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
    clearTimeout(this.state.timeoutId);
  }

  tick() {
    if ( !this.shouldPause ) {
      let currentTime = Date.now();

      var dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0; //gives me the difference in elapsed time
      var interval = this.props.interval; // static number

      // correct for small variations in actual timeout time
      var timeRemainingInInterval = (interval - (dt % interval));
      var timeout = timeRemainingInInterval; 
      if (timeRemainingInInterval < (interval / 2.0)) {
        timeout += interval;
      }

      let adjustTime = this.state.adjustTime ? dt : 0; // determines if timer just came out of a "pause"
      var timeRemaining = Math.max(this.state.timeRemaining - adjustTime, 0);

      var countdownComplete = (this.state.prevTime && timeRemaining <= 0);

      if (this.isMounted()) {
        if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }

        this.setState({
          timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
          prevTime: currentTime,
          timeRemaining: timeRemaining,
        });
      }

      if (countdownComplete) {
        if (this.props.completeCallback) { this.props.completeCallback(); }
        return;
      }

      if (this.props.tickCallback) {
        this.props.tickCallback(timeRemaining);
      }
    }
  }

  getFormattedTime(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds);
    }

    var totalSeconds = Math.round(milliseconds / 1000);

    var seconds = parseInt(totalSeconds % 60, 10);
    var minutes = parseInt(totalSeconds / 60, 10) % 60;
    var hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ':' + minutes + ':' + seconds;
  }

  pauseHandler () {
    this.shouldPause = !this.shouldPause;
    if( !this.shouldPause ){
      this.setState({adjustTime: true});
      this.tick();
    } else {
      this.setState({adjustTime: false});
    }
  }

  pressOut() {
    this.moveProgress(-1);
  }

  pressIn() {
    this.moveProgress(1);
  }

  moveProgress(progress) {
    clearInterval(this.state.stoptimerId);
    let timerId = setInterval(()=>{
      let num = this.state.stopTimerProgress + (progress * 0.05);
      this.setState({stopTimerProgress: num})
      if ( this.state.stopTimerProgress <= 0) {
        clearInterval(this.state.stoptimerId);
      } else if (this.state.stopTimerProgress >= 1) {
        console.log("yay completed!");
      }
    },500);
    this.setState({
      stoptimerId: timerId,
    })    
  }

  render() {
    var timeRemaining = this.state.timeRemaining;
    
    // used to calculate how much to increase the circle by
    let diff = this.state.originalTime - timeRemaining;
    let percentage = (diff/this.state.originalTime);

    return (
      <View className='timer'>
        <Progress.Circle progress={percentage} size={100} color={'#DC3522'} thickness={10} borderWidth={0} animated={false}/>       
        <Text style={this.props.textStyle}>{this.getFormattedTime(timeRemaining)}</Text>
        
        <TouchableOpacity 
          onPressIn={this.pressIn.bind(this)}
          onPressOut={this.pressOut.bind(this)}>        
          <Progress.Circle progress={this.state.stopTimerProgress} size={100} color={'silver'} thickness={5} borderWidth={0} animated={true}/>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#2C3E50',
    justifyContent:'center',
    alignItems:'center'
  },
  ball: {
    backgroundColor: '#DC3522',
    width: 45,
    height: 45,
    borderRadius:50
  },
  ball2: {
    backgroundColor: '#DC3522',
    width: 0,
    height: 0,
    borderRadius:50,
    borderWidth:50,
    borderColor:'white',

  },  
  hand: {
    backgroundColor: '#DC3522',
    width: 20,
    height: 60
  },
  header: {
    color: '#ffffa8',
    fontFamily: 'roboto',
    fontSize: 20,
    textAlign: 'center',
    margin:15,
  },
  button: {
    borderWidth:2,
    borderColor:"white",
    margin:15,
    borderRadius:10,
  },
  buttonContainer: {
    flex:2,
    flexDirection:'row',
    alignItems:'center',    
  },
  testText: {
    backgroundColor:'green'
  }  
});


CountdownTimer.propTypes =  {
  initialTimeRemaining: React.PropTypes.number.isRequired,
  interval: React.PropTypes.number,
  formatFunc: React.PropTypes.func,
  tickCallback: React.PropTypes.func,
  completeCallback: React.PropTypes.func,
  textStyle: React.PropTypes.number
};

CountdownTimer.defaultProps = {
  interval: 1000,
  formatFunc: null,
  tickCallback: null,
  completeCallback: null,
};