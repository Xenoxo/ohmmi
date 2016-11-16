import React, { Component, PropTypes } from 'react';
import { AsyncStorage, ToastAndroid, StyleSheet, TouchableOpacity, View, Text, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03A9F4',
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textHeader: {
    color: 'white',
    fontSize: 45,
    fontFamily: 'roboto',
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
  textInput: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 2,
    marginBottom: 2,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 0,
    height: 0,
    alignSelf: 'stretch',
  },
  helpMessage: {
    fontSize: 10,
    opacity: 0.54,
  },
  subText: {
    color: 'white',
    opacity: 0.5,
  },
  normalText: {
    fontSize: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    margin: 5,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'roboto',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

// the dashboard scene handles all the user interaction on before the timer kicks off
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meditationDuration: 0, // in miliseconds
      setIntervalID: null,
      buttonOpacity: 0.2,
      active: false,
      textInputValue: '',
      fakeTextInput: '',
    };
    this.defaultText = 'Choose Your Session Time';
    AsyncStorage.multiGet(['currentStreak', 'totalTime', 'longestSession', ], (err, stores) => {
     stores.map((result, i, store) => {
       let key = store[i][0];
       let value = store[i][1];
       if (value === null){
        AsyncStorage.setItem(key, '0');
       }
      });
    }).done();

  }

  componentWillMount() {
    this.setState({
      fakeTextInput: this.defaultText,
    });
  }
  // registers when keyboard is hidden for any reason and considers the action a "time setting"
  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', (e) => { this._keyboardDidHide(e); });
  }

  // resets default text when navigation comes back
  componentWillReceiveProps() {
    if (this.props.navigator.getCurrentRoutes().length === 1) {
      this.setState({
        textInputValue: '',
        fakeTextInput: this.defaultText,
        buttonOpacity: 0.2,
        active: false,
      });
    }
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', (e) => { this._keyboardDidHide(e); });
  }

  _keyboardDidHide() {
    this.handleTimerButtonPress(this.state.textInputValue);
    if (this.state.textInputValue.length === 0) {
      this.setState({
        fakeTextInput: this.defaultText,
      });
    }
    this.inputField.blur();
  }

  // always resets meditationDuration for
  // button press, submitting, or keyboardHide
  //
  handleTimerButtonPress(time) {
    if (time !== null) {
      const milisecs = time * 60 * 1000;
      if (Number.isInteger(milisecs) && time.length !== 0 && time > 0) { //  && time % 1 === 0
        const timeInTxt = time.toString();
        this.setState({
          meditationDuration: milisecs,
          buttonOpacity: 1,
          active: true,
          textInputValue: timeInTxt,
          fakeTextInput: timeInTxt,
        });
      } else {
        this.setState({
          buttonOpacity: 0.2,
          active: false,
        });
        ToastAndroid.show('Please enter a whole number greater than zero.', ToastAndroid.LONG, ToastAndroid.CENTER);
      }
    }
  }

  handleStartButtonPress() {
    if (this.state.active && this.state.meditationDuration !== 0) {
      this.props.navigator.push({
        title: 'countdowntimer',
        passedInTime: this.state.meditationDuration,
      });
    }
  }

  handleSmallButtonPress(sceneName) {
    var tsceneName = 'instructions';
    this.props.navigator.push({ title: sceneName });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.subcontainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }} />
          <Text
            style={styles.textHeader}
            onPress={() => { this.inputField.focus(); }}
          >
            { this.state.fakeTextInput }
          </Text>

          <TextInput
            ref={(c) => { this.inputField = c; }}
            style={[styles.textInput, { borderWidth: 3, borderColor: '#ffffff' }]}
            multiline={true}
            value={this.state.textInputValue}
            maxLength={3}
            onChangeText={(text) => {
              this.setState({
                textInputValue: text,
                active: true,
                fakeTextInput: text,
              });
              if (text.length === 0) {
                this.setState({
                  active: false,
                  buttonOpacity: 0.3,
                });
              }
            }}
            keyboardType={'numeric'}
          />
          <Text style={styles.subText}>(or tap on text above to enter your own)</Text>
        </View>


        {/*Default timer buttons*/}
        <View style={styles.subcontainer}>
          <View style={{ flex: 1 }} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 5)}>
              <View style={styles.circleButton}>
                <Text style={styles.buttonText}>5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 10)}>
              <View style={styles.circleButton}>
                <Text style={styles.buttonText}>10</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 15)}>
              <View style={styles.circleButton}>
                <Text style={styles.buttonText}>15</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            { this.state.active ?
              (<Text style={{ fontSize: 15, color: 'white', opacity: 0.8, fontWeight: '400' }}>
                <Icon name="bell" size={15} color="white" /> Be sure your volume is up :) <Icon name="bell" size={15} color="white" />
              </Text>) : <Text />
            }
          </View>
        </View>

        {/* for the nav buttons */}
        <View style={[styles.subcontainer, {justifyContent:'center',}]}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={this.handleSmallButtonPress.bind(this, 'instructions')}>
              <View style={[styles.smallCircleButton, { backgroundColor: '#F8BBD0' }]}>
                <Icon name="question" size={30} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.handleStartButtonPress.bind(this)}
              activeOpacity={this.state.active ? 0.2 : 1}
            >
              <View style={[styles.circleButton, { opacity: this.state.buttonOpacity }]}>
                <Text style={[styles.buttonText, { fontSize: 28, fontWeight: '900' }]}>start</Text>
              </View>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={this.handleSmallButtonPress.bind(this, 'stats')}>
              <View style={[styles.smallCircleButton, { backgroundColor: '#F8BBD0' }]}>
                <Icon name="signal" size={25} color="white" />
              </View>
            </TouchableOpacity>
          </View>
            {/*<TouchableOpacity onPress={this.handleSmallButtonPress.bind(this, 'stats')}>
              <View style={[styles.smallCircleButton, { backgroundColor: '#F8BBD0' }]}>
                <Icon name="signal" size={25} color="white" />
              </View>
            </TouchableOpacity>*/}
          
        </View>
      </View>
    );
  }
}

Dashboard.propTypes = {
  // title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
};
