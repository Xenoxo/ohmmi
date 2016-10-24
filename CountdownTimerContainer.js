import React, { Component, PropTypes } from 'react';
import PushNotification from 'react-native-push-notification';
import CountdownTimer from './CountdownTimer';

// import Sound from 'react-native-sound'; // for the bell sound

export default class CountdownTimerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSetTime: this.props.timeAmount,
    };

    // configures push notification
    PushNotification.configure({
      onNotification(notification) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: true,
    });
    this.timerDone = this.timerDone.bind(this);
    this.pushNotificationHandler = this.pushNotificationHandler.bind(this);
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

  timerDone() {
    this.props.navigator.pop();
  }

  render() {
    return (
        <CountdownTimer
          interval={25}
          initialTimeRemaining={this.state.userSetTime}
          completeCallback={this.timerDone}
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
