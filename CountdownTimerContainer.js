import React, { Component, PropTypes, AsyncStorage } from 'react';
import PushNotification from 'react-native-push-notification';
import CountdownTimer from './CountdownTimer';

// import Sound from 'react-native-sound'; // for the bell sound

export default class CountdownTimerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSetTime: this.props.timeAmount,
    };
    this.timerDone = this.timerDone.bind(this);
    this.backOut = this.backOut.bind(this);
    this.pushNotificationHandler = this.pushNotificationHandler.bind(this);

    // configures push notification
    PushNotification.configure({
      onNotification(notification) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: true,
    });
  }

  componentDidMount() {
    this.pushNotificationHandler(true, this.props.timeAmount);
  }

  componentWillUnmount() {
    this.pushNotificationHandler(false); // cancels push notification when screen switches
  }

  pushNotificationHandler(status, timeleft) {
    if (status) {
      PushNotification.localNotificationSchedule({ // starts off the push notification
        id: '1',
        title: 'Congratulations',
        message: "You've completed the session :)",
        date: new Date(Date.now() + timeleft), // in miliseconds
        playSound: true, // (optional) default: true
        soundName: 'bell.wav',
        smallIcon: 'old_ic_launcher',
      });
    } else {
      PushNotification.cancelLocalNotifications({ id: '1' });
    }
  }

  backOut() { // for when the user just clicks on "back"
    this.props.navigator.pop();
  }

  timerDone() {
    // let usertime = this.state.userSetTime;
    // AsyncStorage.getItem("longestSession").then(
    //   function(val) {
    //     let temp = val;
    //     if (parseInt(val) < usertime) {
    //       AsyncStorage.setItem("longestSession", usertime.toString()).done();
    //       console.log("longestSession updated adn is: "+ usertime );
    //     }

    //   }
    // ).done();
    this.backOut();
  }

  render() {
    return (
        <CountdownTimer
          interval={25}
          initialTimeRemaining={this.state.userSetTime}
          completeCallback={this.timerDone}
          backOut={this.backOut}
          pushNotificationHandler={this.pushNotificationHandler}
        />
    );
  }
}

CountdownTimerContainer.propTypes = {
  // title: PropTypes.string.isRequired,
  timeAmount: PropTypes.number.isRequired,
  navigator: PropTypes.object.isRequired,
};
