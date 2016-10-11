import React, { Component, PropTypes } from 'react';
import { StyleSheet, Aniimation, TouchableOpacity, View, Text, TouchableHighlight, TextInput } from 'react-native';

import * as Progress from 'react-native-progress';

import TimerMixin from 'react-timer-mixin';

export default class Dashboard extends Component {
  
  // the dashboard scene handles all the user interaction on before the timer kicks off
  /*
    Navigation
  */
  mixins: [TimerMixin];
  constructor(props) {
    super(props);
    this.state = {
      stopTimerProgress:0,
      stoptimerId: null,
      theTime: "not needed",
      counter:0,
      setIntervalID: null,
    };
  };

  // startCount(timerID){
  //  let setIntervalID = setInterval(() => {
  //     this.setState({ counter: this.state.counter+1 });
  //   }, 1000);
  //  this.setState({ setIntervalID: setIntervalID });
  // };

  // stopCount(timerID){
  //   if (timerID != null){
  //     clearInterval(timerID);
  //   }
  // };

  // resetCount(timerID){
  //   if (timerID != null){
  //     this.stopCount(timerID);
  //     this.setState({ counter: 0 });
  //   }
  // };
  componentDidUpdate() {
    
  }

  longPress() {
    // console.log("worked")
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
        console.log("less than 0");
      }
    },500);
    this.setState({
      stoptimerId: timerId,
    })    
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          defaultValue={"How long is your session?"}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={styles.circleButton}>
              <Text style={styles.buttonText}>15</Text>
            </View>
          </TouchableOpacity>          
          <TouchableOpacity>
            <View style={styles.circleButton}>
              <Text style={styles.buttonText}>30</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.circleButton}>
              <Text style={styles.buttonText}>60</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={() => this.props.navigator.push({title:'meditationTimer'})}
          delayLongPress={3}

        >
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          // onPress={() =>(console.log("pressed"))}
          // onLongPress={this.longPress.bind(this)}
          // delayLongPress={3000}
          onPressIn={this.pressIn.bind(this)}
          onPressOut={this.pressOut.bind(this)}

          // delayLongPress={3}
        >        
          <Progress.Circle progress={this.state.stopTimerProgress} size={100} color={'silver'} thickness={5} borderWidth={0} animated={true}/>
        </TouchableOpacity>
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



const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer: {
    flex:0,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  circleButton: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:55,
    height:55,
    borderRadius:50,
    backgroundColor:'#FF5722',
  },
  buttonText: {
    color:"white",
    opacity:.8
  },
  startButton: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:55,
    height:55,
    borderRadius:50,
    opacity:.3,
    backgroundColor:'#8BC34A',
  },
  startButtonText: {
    color:"white",
  },
});
