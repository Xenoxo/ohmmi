import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Navigator, AppRegistry, BackAndroid } from 'react-native';
import CountdownTimerContainer from './CountdownTimerContainer';
import Dashboard from './Dashboard';
import Instructions from './Instructions';

var _navigator;

class ohmmi extends Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (_navigator.getCurrentRoutes().length === 1) {
        return false;
      }
      _navigator.pop();
      return true;
    });
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.title) {
      case 'dashboard':
        return (
          <Dashboard
            navigator={navigator}
            title="dashboard"
            timeAmount={0}
          />);
      case 'countdowntimer':
        return (
          <CountdownTimerContainer
            navigator={navigator}
            title="countdowntimer"
            timeAmount={route.passedInTime}
          />);
      case 'instructions':
        return (
          <Instructions
            navigator={navigator}
            title="instructions"
          />);
    }
  }

  navigatorConfigureScene(route, routeStack) {
    switch (route.title) {
      case 'instructions':
        return Navigator.SceneConfigs.FloatFromLeft;
      case 'countdowntimer':
        return Navigator.SceneConfigs.FloatFromRight;
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'instructions' }}
        renderScene={this.navigatorRenderScene}
        configureScene={this.navigatorConfigureScene}
      />
    );
  }
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDJHA0mf2tXvy-XRxqdjFZZCMYo6iKmjQQ',
  authDomain: 'ohmmi-d657e.firebaseapp.com',
  databaseURL: 'https://ohmmi-d657e.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '850235245035',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


AppRegistry.registerComponent('ohmmi', () => ohmmi);
