import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Navigator, AppRegistry } from 'react-native';
import CountdownTimerContainer from './CountdownTimerContainer';
import Dashboard from './Dashboard';
import Instructions from './Instructions';


class ohmmi extends Component {
  navigatorRenderScene(route, navigator) {
    switch (route.title) {
      case 'dashboard':
        return (
          <Dashboard
            navigator={ navigator }
            title="dashboard"
            timeAmount={0} />);
      case 'countdowntimer':
        return (
          <CountdownTimerContainer
            navigator={ navigator }
            title="countdowntimer"
            timeAmount={ route.passedInTime } />);
      case 'instructions':
        return (
          <Instructions 
            navigator={ navigator }
            title='instructions' />);
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'dashboard' }}
        renderScene={ this.navigatorRenderScene }
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
