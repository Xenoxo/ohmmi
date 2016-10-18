import React, { Component } from 'react';
import { Navigator, AppRegistry } from 'react-native';
import * as firebase from 'firebase';

import MeditationTimerScene from './MeditationTimerScene';

import Dashboard from './Dashboard';

import * as Progress from 'react-native-progress';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJHA0mf2tXvy-XRxqdjFZZCMYo6iKmjQQ",
  authDomain: "ohmmi-d657e.firebaseapp.com",
  databaseURL: "https://ohmmi-d657e.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "850235245035"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


class ohmmi extends Component {
  constructor(props){
    super(props);
    this.state = {}
  };

  componentWillMount(){
  }
  
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.title) {
      case 'dashboard':
        return (<Dashboard navigator={navigator} title="dashboard" timeAmount={0}/>);
      case 'meditationTimer':
        return (<MeditationTimerScene navigator={navigator} title="meditationTimer" timeAmount={route.passedInTime}/>);
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


AppRegistry.registerComponent('ohmmi', () => ohmmi);
