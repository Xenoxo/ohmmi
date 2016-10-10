import React, { Component } from 'react';
import {Easing, Animated, TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

import MeditationTimerScene from './MeditationTimerScene';
import AnimationStation from './AnimationStation';
import Dashboard from './Dashboard';

import * as Progress from 'react-native-progress';

import TimerMixin from 'react-timer-mixin';

import CountdownTimer from './CountdownTimer'

class ohmmi extends Component {
  mixins: [TimerMixin];

  constructor(props){
    super(props);
    this.animationValue = new Animated.Value(0)
    this.springValue = new Animated.Value(0)
    this.state = {
      dynamicText:'Click here to spin',
      percentage:0,
      timePassed:0,
      timerID:null,
      timerID1:null,
      userSetTime: 120000,
    }
  };


  componentWillReceiveProps(props){
    // console.log(props);
  };

//
//  Time passed in should be mapped to a 1/1000th scale which would determine the rate
//

  componentWillMount(){
  }

  startCount(){
    let sec = 14;
    let degTime = 360.0/sec; //the amount of time passed should be calculated here
    let rate = (degTime.toPrecision(21))/3600.0;
    let theID = setInterval(()=>{
      this.setState({percentage:(this.state.percentage+rate)});
    },100);
    
    this.setState({timerID:theID});

    let theID1 = setInterval(()=>{
      let d = new Date();
      let s = d.getSeconds()%10;
        this.setState({timePassed:this.state.timePassed+1});
    },1000);
    this.setState({timerID1:theID1});
  }

  stopCount(){
    if (this.state.timerID !== null){
      clearInterval(this.state.timerID);
      clearInterval(this.state.timerID1);
      this.setState({timerID:null});
      this.setState({timerID1:null});
    }
  }

  spring(){
    this.springValue.setValue(0);
    Animated.spring(
      this.springValue,
      {
        toValue:1,
        friction:1
      }
    ).start();
  }

  spin(){
    this.animationValue.setValue(0);
    Animated.timing(
      this.animationValue,
      {
        toValue:1,
        duration:1000,
        easing:Easing.linear,
      }
    ).start(()=> this.spin());
  }

  render() {
    // const spin = this.animationValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // });
    return (
		<View style={styles.container}>
      <CountdownTimer interval={50} initialTimeRemaining={this.state.userSetTime} textStyle={styles.header}/>
      </View>
    )
  }
}


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


AppRegistry.registerComponent('ohmmi', () => ohmmi);

/*
      <Animated.View style={[styles.hand,{transform:[{rotate:spin}] }]}/>
      <Text style={styles.header} onPress={this.spin.bind(this)}>{this.state.dynamicText}</Text>
      
      <Animated.View style={[styles.ball,{transform:[{scale:this.springValue}] }]}/>
      <Text style={styles.header} onPress={this.spring.bind(this)}>bounce</Text>


*/