import React, { Component } from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';

import * as Progress from 'react-native-progress';

//
// Generic Countdown Timer UI component
// With added changes to allow for 'pausing'
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
      adjustTime: true, // determines whether to account for delay, used to 'pause'
      stopTimerProgress:0, // used by the stop button
      stoptimerId: null, // used by the stop button
      isPaused:false
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

      let dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0; //gives the difference in elapsed time
      let interval = this.props.interval; // static number

      // correct for small variations in actual timeout time
      let timeRemainingInInterval = (interval - (dt % interval));
      let timeout = timeRemainingInInterval; 
      if (timeRemainingInInterval < (interval / 2.0)) {
        timeout += interval;
      }

      let adjustTime = this.state.adjustTime ? dt : 0; // determines if timer just came out of a "pause"
      let timeRemaining = Math.max(this.state.timeRemaining - adjustTime, 0);

      let countdownComplete = (this.state.prevTime && timeRemaining <= 0);

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

    let totalSeconds = Math.round(milliseconds / 1000);

    let seconds = parseInt(totalSeconds % 60, 10);
    let minutes = parseInt(totalSeconds / 60, 10) % 60;
    let hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ':' + minutes + ':' + seconds;
  }

  pauseHandler () {
    this.shouldPause = !this.shouldPause;
    if( !this.shouldPause ){ // when the timer is going
      this.setState({
        adjustTime: true,
        actionText: 'stop',
        isPaused: false
      });
      this.tick();
    } else { // when the timer is stopped
      this.setState({
        adjustTime: false,
        actionText: 'resume',
        isPaused: true
      });
    }
  }

  render() {
    let timeRemaining = this.state.timeRemaining;
    // used to calculate how much to increase the circle by
    let diff = this.state.originalTime - timeRemaining;
    let percentage = (diff/this.state.originalTime);
    return (
      <View style={styles.container}>
        <Progress.Circle 
          progress={percentage}
          size={200} 
          color={'#0277BD'} 
          thickness={30} 
          borderWidth={0} 
          animated={false}
        />       
          <Text>{this.getFormattedTime(timeRemaining)}</Text>
        <TouchableOpacity
          onPress={this.pauseHandler.bind(this)}
          onLongPress={this.props.completeCallback.bind(this)}>
          <View style={[styles.circleButton,{backgroundColor:'#8BC34A'}]}>
            {this.state.isPaused ? (<View style={styles.resume}></View>) : (<View style={styles.pause}></View>)}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#E1F5FE'
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
  circleButton: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:85,
    height:85,
    borderRadius:50,
    margin:16
  },
  pause: {
    width:45,
    height:45,
    backgroundColor:'white',
    opacity: .8
  },
  resume: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 40,
    marginLeft:15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    opacity: .8,
    transform: [
      {rotate: '90deg'}
    ]
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



  // stopButtonOutHandler() {
  //   this.moveProgress(-1);
  // }

  // stopButtonInHandler() {
  //   this.moveProgress(1);
  // }

  // moveProgress(progress) {
  //   clearInterval(this.state.stoptimerId);
  //   let timerId = setInterval(()=>{
  //     let num = this.state.stopTimerProgress + (progress * 0.015);
  //     this.setState({stopTimerProgress: num})
  //     if ( this.state.stopTimerProgress <= 0) { //handles if the value goes below 0
  //       clearInterval(this.state.stoptimerId);
  //       this.setState({stopTimerProgress: 0})
  //     } else if (this.state.stopTimerProgress >= 1) {
  //       console.log("yay completed!");
  //     }
  //   },10);
  //   this.setState({
  //     stoptimerId: timerId,
  //   })    
  // }    


        // <TouchableOpacity 
        //   onPressIn={this.stopButtonInHandler.bind(this)}
        //   onPressOut={this.stopButtonOutHandler.bind(this)}>        
        //   <Progress.Circle progress={this.state.stopTimerProgress} size={100} color={'silver'} thickness={5} borderWidth={0} animated={true}/>
        // </TouchableOpacity>