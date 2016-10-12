import React, { Component } from 'react';
import {Easing, Animated, TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

import MeditationTimerScene from './MeditationTimerScene';

import Dashboard from './Dashboard';

import * as Progress from 'react-native-progress';

class ohmmi extends Component {
  constructor(props){
    super(props);
    this.state = {}
  };


  componentWillReceiveProps(props){
    // console.log(props);
  };
  
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.title) {
      case 'dashboard':
        return (<Dashboard navigator={navigator} title="dashboard"/>);
      case 'meditationTimer':
        return (<MeditationTimerScene navigator={navigator} title="meditationTimer" />);
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{title:'dashboard'}}
        renderScene={this.navigatorRenderScene}
      />
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
	headertext: {
		color: '#ffffa8',
		fontFamily: 'roboto',
		fontSize: 20,
		textAlign: 'center',
    margin:15,
	} 
});


AppRegistry.registerComponent('ohmmi', () => ohmmi);
