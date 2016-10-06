import React, { Component } from 'react';
import { Animated, TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

import MeditationTimerScene from './MeditationTimerScene';
import AnimationStation from './AnimationStation';
import Dashboard from './Dashboard';

class ohmmi extends Component {

  componentWillReceiveProps(props){
    // console.log(props);
  };

  render() {
    return (
		<View style={styles.container}>
      <View style={styles.ball}></View>
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
    width: 30,
    height: 30,
    borderRadius:50
  },
	header: {
		color: '#DC3522',
		fontFamily: 'roboto',
		fontSize: 30,
		textAlign: 'center',
	},
});



AppRegistry.registerComponent('ohmmi', () => ohmmi);