import React, { Component, PropTypes } from 'react';
import { 
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  TouchableHighlight 
} from 'react-native';

import CountdownTimer from './CountdownTimer';

import Sound from 'react-native-sound'; //for the bell sound

var PushNotification = require('react-native-push-notification');
PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function(token) {
    //     console.log( 'TOKEN:', token );
    // },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
    // senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    // },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    // requestPermissions: true,
});


export default class MeditationTimerScene extends Component {
  constructor(props){
    super(props);
    this.state = {
      userSetTime: this.props.timeAmount,
    }
  }

  componentDidMount(){
    PushNotification.localNotificationSchedule({
      id: '1',
      title: "Congratulations",
      message: "You've completed the session :)",
      date: new Date(Date.now() + (this.props.timeAmount)), // in miliseconds
      playSound: true, // (optional) default: true
      soundName: 'bell.wav',
      ticker: "My Notification Ticker", // (optional)
    });
  }

  componentWillUnmount(){
    PushNotification.cancelLocalNotifications({id: '1'});
  }

  playSound() {
    let s = new Sound('bell.wav','', (e) => {
      if (e) {
        console.log('error', e);
      } else {
        // console.log('duration', s.getDuration());
        s.setVolume(1);
        s.play();
      }
    });
  }

  timerDone() {    
    this.props.navigator.pop();
  }

  render() {
    var date = Date.now();
    return (
        <CountdownTimer 
          interval={25}
          initialTimeRemaining={this.state.userSetTime}
          completeCallback={this.timerDone.bind(this)}
          completedSound={this.playSound.bind(this)}
        />
    )
  }

  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   routeIndex: PropTypes.number.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }

}
