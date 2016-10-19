import React, { Component, PropTypes } from 'react';
import { ToastAndroid, StyleSheet, TouchableOpacity, View, Text, TextInput, Keyboard } from 'react-native';

// the dashboard scene handles all the user interaction on before the timer kicks off
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meditationDuration: 0, // in miliseconds
      setIntervalID: null,
      buttonOpacity: 0.3,
      active: false,
      textInputValue: null,
    };
  }

  // registers when keyboard is hidden for any reason and considers the action a "time setting"
  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', (e) => { this._keyboardDidHide(e); });
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', (e) => { this._keyboardDidHide(e); });
  }

  _keyboardDidHide() {
    this.handleTimerButtonPress(this.state.textInputValue);
  }

  handleTimerButtonPress(time) {
    // always resets meditationDuration for button press, submitting, or keyboardHide
    this.setState({ meditationDuration: 0 });
    if (time !== null) {
      const milisecs = time * 60 * 1000;
      if (Number.isInteger(milisecs) && time.length !== 0 && time > 0) { //&& time%1===0
        this.setState({
          meditationDuration: milisecs,
          buttonOpacity: 0.8,
          active: true,
          textInputValue: time+'',
        });
      } else {
        this.setState({
          buttonOpacity: 0.3,
          active: false,
        });
        ToastAndroid.show('Please enter a whole number greater than zero.', ToastAndroid.LONG, ToastAndroid.CENTER);
      }
    }
  }

  handleStartButtonPress() {
    if (this.state.active && this.state.meditationDuration !== 0) {
      this.props.navigator.push({
        title: 'meditationTimer',
        passedInTime: this.state.meditationDuration,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.textInput, this.state.active ? styles.hugeText : styles.normalText]}
            multiline={true}
            placeholder={'How long is this session?'}
            value={this.state.textInputValue}
            onChangeText={(text)=> {
              this.setState({
                textInputValue:text,
                active:true,
              });
              if (text.length === 0){
                this.setState({
                  active:false,
                  buttonOpacity:0.3,
                });
              }
            }}
            keyboardType={'numeric'}
            blurOnSubmit={true}
          />
        </View>
      <Text style={styles.helpMessage}>(tap above to enter a custom amount)</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 10)}>
            <View style={[styles.circleButton,{backgroundColor:'#FF5722'}]}>
              <Text style={styles.buttonText}>10</Text>
            </View>
          </TouchableOpacity>          
          <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 30)}>
            <View style={[styles.circleButton,{backgroundColor:'#FF5722'}]}>
              <Text style={styles.buttonText}>30</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 60)}>
            <View style={[styles.circleButton,{backgroundColor:'#FF5722'}]}>
              <Text style={styles.buttonText}>60</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Submit button */}
        <TouchableOpacity
          onPress={this.handleStartButtonPress.bind(this)}
          activeOpacity={ this.state.active ? 0.2 : 1}
        >
          <View style={[styles.circleButton, {backgroundColor:'#8BC34A',opacity: this.state.buttonOpacity}]}>
            <Text style={styles.buttonText}>Start</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   routeIndex: PropTypes.number.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
  },
  helpMessage: {
    fontSize: 10,
    opacity: 0.54,
  },
  hugeText: {
    fontSize: 90,
    opacity: 0.87,
  },
  normalText: {
    fontSize: 25,
    fontWeight: '700',
    opacity: 0.87,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 85,
    borderRadius: 50,
    margin: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});
