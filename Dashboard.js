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
      fakeTextInput: 'Choose Your Session Time',
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
        title: 'countdowntimer',
        passedInTime: this.state.meditationDuration,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>  
          <View style={[styles.subcontainer1, {backgroundColor:'#03A9F4'}]}>
            <View style={{flex:1}}></View>
            <Text 
              style={styles.textHeader}
              onPress={(event) => { this.refs.inputField.focus(); }
            }>{ this.state.fakeTextInput }</Text>
            <TextInput
              ref='inputField'
              // style={[styles.textInput, this.state.active ? styles.normalText : styles.normalText,
              //   {borderWidth:3, borderColor:"#ffffff"}]}
              style={[styles.textInput, {borderWidth:3, borderColor:"#ffffff"}]}
              multiline={true}
              // placeholder={'How long is this session?'}
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
            <Text style={styles.subText}>(or tap above to enter your own)</Text>
          
        </View>


        <View style={[styles.subcontainer2, {backgroundColor:'#03A9F4'}]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 10)}>
              <View style={styles.circleButton}>
                <Text style={styles.buttonText}>10</Text>
              </View>
            </TouchableOpacity>          
            <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 30)}>
              <View style={styles.circleButton}>
                <Text style={styles.buttonText}>30</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleTimerButtonPress.bind(this, 60)}>
              <View style={styles.circleButton}>
                <Text style={styles.buttonText}>60</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <View style={[styles.subcontainer3, {backgroundColor:'#03A9F4'}]}>
          <TouchableOpacity
            onPress={this.handleStartButtonPress.bind(this)}
            activeOpacity={ this.state.active ? 0.2 : 1}>
            <View style={[styles.circleButton, {opacity: this.state.buttonOpacity}]}>
              <Text style={[styles.buttonText, { fontSize: 25 }]}>begin</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.smallCircleButton, { backgroundColor:'#F8BBD0'}]}>
              <Text style={ styles.buttonText }>?</Text>
            </View>
          </TouchableOpacity>   
        </View>
      </View>
    )
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    timeAmount: PropTypes.number.isRequired,
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer1: {
    flex:1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subcontainer2: {
    flex:1,
    alignSelf: 'stretch',
  },
  subcontainer3: {
    flex:1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },    
  textHeader: {
    // flex:1,
    color: 'white',
    fontSize: 45,
    fontFamily: 'roboto',
    textAlign: 'center',
    margin: 0,
    padding:0,
    // lineHeight: 50,
  },
  textInput: {
    // flex: 1,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop:2,
    marginBottom:2,
    paddingTop:0,
    paddingBottom:0,
    fontSize: 0,
    height:0,
    // backgroundColor:'black',
    // height:20,
    alignSelf: 'stretch',
  },
  helpMessage: {
    fontSize: 10,
    opacity: 0.54,
  },
  subText: {
    color:'white',
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
    backgroundColor:'#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 16,
    elevation: 5,
  },
  smallCircleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    margin: 5,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'roboto',
  },
});
