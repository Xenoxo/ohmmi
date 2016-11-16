import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, InteractionManager, Image, AsyncStorage } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  progressContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  circleButton: {
    flex: 1,
    width: 85,
    height: 85,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 16,
    elevation: 4,
  },
  smallCircleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    margin: 5,
    elevation: 4,
  },
});

export default class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: props.initialTimeRemaining,
      timeoutId: null,
      prevTime: null,
      originalTime: props.initialTimeRemaining,
      adjustTime: true, // determines whether to account for delay, used to 'pause'
      stoptimerId: null, // used by the stop button
      isPaused: false,
      renderPlaceholderOnly: true,
    };
    this.displayName = 'CountdownTimer';
    this.getFormattedTime = this.getFormattedTime.bind(this);
    this.tick = this.tick.bind(this);
    this.isComponentMounted = false;
    this.shouldPause = false; // determines whether tick() fires, might be able to make it a state?
    this.pauseHandler = this.pauseHandler.bind(this);
  }

  isMounted() {
    return this.isComponentMounted;
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.tick();
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });    
  }

  componentWillReceiveProps(newProps) {
    if (this.state.timeoutId && !this.shouldPause) {
      clearTimeout(this.state.timeoutId);
    }
    this.setState({ prevTime: null, timeRemaining: newProps.initialTimeRemaining });
  }

  componentDidUpdate() {
    if (!this.state.prevTime && this.state.timeRemaining > 0
        && this.isMounted() && !this.shouldPause) {
      this.tick();
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
    clearTimeout(this.state.timeoutId);
  }

  // Main method for keeping track of time
  tick() {
    if (!this.shouldPause) {
      let currentTime = Date.now();

      // gives the difference in elapsed time
      let dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
      let interval = this.props.interval; // static number

      // correct for small variations in actual timeout time
      let timeRemainingInInterval = (interval - (dt % interval));
      let timeout = timeRemainingInInterval;
      if (timeRemainingInInterval < (interval / 2.0)) {
        timeout += interval;
      }

      // determines if timer just came out of a "pause"
      let adjustTime = this.state.adjustTime ? dt : 0;
      let timeRemaining = Math.max(this.state.timeRemaining - adjustTime, 0);
      let countdownComplete = (this.state.prevTime && timeRemaining <= 0);

      if (this.isMounted()) {
        if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }

        this.setState({
          timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
          prevTime: currentTime,
          timeRemaining,
        });
      }

      // fires off when countdown is done
      if (countdownComplete) {
        let usertime = this.state.originalTime;
        // AsyncStorage.getItem("longestSession").then(
        //   function(result) {
        //     if (parseInt(result) < usertime) {
        //       AsyncStorage.setItem("longestSession", usertime.toString()).then().done();
        //     }
        //   }
        // ).done();

        AsyncStorage.multiGet(['currentStreak', 'totalTime', 'longestSession'], (err, stores) => {
         stores.map((result, i, store) => {
           let key = store[i][0];
           let value = store[i][1];
           if (key === 'longestSession' && parseInt(value) < usertime){
              AsyncStorage.setItem("longestSession", usertime.toString()).then().done();
           } else if (key === 'totalTime'){
              let calculation = (usertime/3600000);
              let newtotal = parseInt(value) + calculation;
              AsyncStorage.setItem("totalTime", "13.5746").then().done();
              // AsyncStorage.setItem("totalTime", newtotal.toString()).then().done();
              console.log("newtotal "+newtotal);
           } else {
              console.log("key is "+key+"value is "+value);
           }
          });
        }).done();


        if (this.props.completeCallback) {
          this.props.completeCallback();
        }
        return;
      }

      if (this.props.tickCallback) {
        this.props.tickCallback(timeRemaining);
      }
    }
  }

  getFormattedTime(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds);
    }

    let totalSeconds = Math.round(milliseconds / 1000);
    let seconds = parseInt(totalSeconds % 60, 10);
    let minutes = parseInt(totalSeconds / 60, 10) % 60;
    let hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ':' + minutes + ':' + seconds;
  }

  pauseHandler() {
    this.shouldPause = !this.shouldPause;
    if (!this.shouldPause) {
      this.setState({ // timer is stopped and pressing button will do...
        isPaused: false,
        adjustTime: true,
        actionText: 'stop',
      });
      this.tick();
      this.props.pushNotificationHandler(true, this.state.timeRemaining);
    } else { // timer is going and pressing button will do...
      this.props.pushNotificationHandler(false);
      this.setState({
        isPaused: true,
        adjustTime: false,
        actionText: 'resume',
      });
    }
  }

  // The loading screen
  _renderPlaceholderView() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom:10, fontSize: 20 }}>Preparing...</Text>
        <Image source={require('./ohmmi_96.png')} />
      </View>
    );
  }    

  render() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }
    let timeRemaining = this.state.timeRemaining;
    let diff = this.state.originalTime - timeRemaining;
    let percentage = (diff / this.state.originalTime);
    return (
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Progress.Circle
            progress={percentage}
            size={300}
            color={'#03A9F4'}
            thickness={50}
            borderWidth={0}
            animated={false}
            showsText={true}
            formatText={this.getFormattedTime(timeRemaining)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.pauseHandler}
          >
            <View style={[styles.circleButton, { backgroundColor: '#8BC34A' }]}>
              {this.state.isPaused ?
                <Icon name="play" size={55} color="#F5F5F5" style={{ marginLeft: 15 }} /> :
                <Icon name="pause" size={55} color="#F5F5F5" style={{ justifyContent: 'center', alignItems: 'center' }} />
              }
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.completeCallback}>
            <View style={[styles.smallCircleButton, { backgroundColor: '#F8BBD0' }]}>
              <Icon name="undo" size={30} color="#F5F5F5" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CountdownTimer.propTypes = {
  initialTimeRemaining: React.PropTypes.number.isRequired,
  interval: React.PropTypes.number,
  formatFunc: React.PropTypes.func,
  tickCallback: React.PropTypes.func,
  backOut: React.PropTypes.func,
  completeCallback: React.PropTypes.func,
  pushNotificationHandler: React.PropTypes.func,
};

CountdownTimer.defaultProps = {
  interval: 1000,
  formatFunc: null,
  tickCallback: null,
  completeCallback: null,
};

//
// props:
//   - initialTimeRemaining: Number
//       The time remaining for the countdown (in ms).
//
//   - interval: Number (optional -- default: 1000ms)
//       The time between timer ticks (in ms).
//
//   - formatFunc(timeRemaining): Function (optional)
//       A function that formats the timeRemaining.
//
//   - tickCallback(timeRemaining): Function (optional)
//       A function to call each tick.
//
//   - completeCallback(): Function (optional)
//       A function to call when the countdown completes.
//

