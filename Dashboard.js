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
      meditationDuration: 0,
      counter:0,
      setIntervalID: null,
      buttonOpacity: 0.3,
      active: false,
      textInputValue:null,
    };
  };

  componentDidUpdate() {
    
  }

  longPress() {
    // console.log("worked")
  }

  componentWillMount() {
  }

  handleTimerButtonPress(time){
    let milisecs = time * 60 * 1000;
    this.setState({
      meditationDuration: milisecs,
      buttonOpacity:0.8,
      active: true,
      textInputValue: time+'',
    })
  }

  handleStartButtonPress(){
    if (this.state.active) {
      this.props.navigator.push({
        title:'meditationTimer',
        passedInTime:this.state.meditationDuration
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Choose below for session times or enter here</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            // placeholder={'Choose below for session times or enter here'}
            value={this.state.textInputValue}
            onChangeText={(text) => this.setState({textInputValue:text})}
            onSubmitEditing={this.handleTimerButtonPress.bind(this, this.state.textInputValue)}
            keyboardType={'numeric'}
            blurOnSubmit={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 15)}>
            <View style={[styles.circleButton,{backgroundColor:'#FF5722'}]}>
              <Text style={styles.buttonText}>15</Text>
            </View>
          </TouchableOpacity>          
          <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 30)}>
            <View style={[styles.circleButton,{backgroundColor:'#FF5722'}]}>
              <Text style={styles.buttonText}>30</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 60)}>
            <View style={[styles.circleButton,{backgroundColor:'#FF5722'}]}>
              <Text style={styles.buttonText}>60</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={this.handleStartButtonPress.bind(this)}
          delayLongPress={3}
        >
          <View style={[styles.circleButton, {backgroundColor:'#8BC34A',opacity: this.state.buttonOpacity}]}>
            <Text style={styles.buttonText}>Start</Text>
          </View>
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
    alignItems:'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  textInputContainer: {
    flexDirection:'row',
  },
  textInput: {
    flex:1,
    textAlign:'center',
    marginLeft:20,
    marginRight:20,
    fontSize:30
  },
  buttonContainer: {
    flex:0,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
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
  buttonText: {
    color:"white",
    fontSize:30,
    opacity:.9
  },
});


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
