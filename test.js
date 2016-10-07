import React, { Component } from 'react';
import {Animated, Easing, Image, TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

import MeditationTimerScene from './MeditationTimerScene';
import AnimationStation from './AnimationStation';
import Dashboard from './Dashboard';

import TimerMixin from 'react-timer-mixin';

class ohmmi extends Component {
  mixins: [TimerMixin];
  constructor(){
    super();
    this.animatedValue = new Animated.Value(0);
  }

  // componentDidMount(){
  //   this.animate();
  // }

  animate(){
    this.animatedValue.setValue(0);
    Animated.spring(
      this.animatedValue,
      {
        toValue:1,
        friction:1
      }).start()
  }

  render(){
  // const tinyicon = this.animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 300]
  // })
    return (
    <View style={styles.container}>
      <Text onPress={this.animate.bind(this)}>Click here to bounce</Text>



      
      <Progress.Bar progress={0.3} width={200} />
      <Progress.Circle size={30} indeterminate={true} />
          <Animated.Image
            style={{
              width: 227,
              height: 200,
              transform: [{scale: this.animatedValue}]
              // transform: [{rotate: spin}] 
            }}
              source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150
  }
})



AppRegistry.registerComponent('ohmmi', () => ohmmi);