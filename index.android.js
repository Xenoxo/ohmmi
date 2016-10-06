import React, { Component } from 'react';
import {Easing, Animated, TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

import MeditationTimerScene from './MeditationTimerScene';
import AnimationStation from './AnimationStation';
import Dashboard from './Dashboard';

class ohmmi extends Component {
  constructor(props){
    super(props);
    this.animationValue = new Animated.Value(0)
    this.springValue = new Animated.Value(0)
    this.state = {
      dynamicText:'Click here to spin',
    }
  }


  componentWillReceiveProps(props){
    // console.log(props);
  };

  componentWillMount(){
  }
  spring(){
    this.springValue.setValue();
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
  const spin = this.animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const spring = this.animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0,1 ]
  });
    return (
		<View style={styles.container}>
      <Animated.View style={[styles.hand,{transform:[{rotate:spin}] }]}/>
      <Text style={styles.header} onPress={this.spin.bind(this)}>{this.state.dynamicText}</Text>
      <Animated.View style={[styles.ball,{transform:[{scale:spring}] }]}/>
      <Text style={styles.header} onPress={this.spring.bind(this)}>bounce</Text>
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
});



AppRegistry.registerComponent('ohmmi', () => ohmmi);