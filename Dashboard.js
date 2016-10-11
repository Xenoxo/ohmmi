import React, { Component, PropTypes } from 'react';
import { StyleSheet, Aniimation, TouchableOpacity, View, Text, TouchableHighlight, TextInput } from 'react-native';

export default class Dashboard extends Component {
  
  // the dashboard scene handles all the user interaction on before the timer kicks off
  /*
    Navigation
  */

  constructor(props) {
    super(props);
    this.state = {
      theTime: "not needed",
      counter:0,
      setIntervalID: null,
    };
  };

  startCount(timerID){
   let setIntervalID = setInterval(() => {
      this.setState({ counter: this.state.counter+1 });
    }, 1000);
   this.setState({ setIntervalID: setIntervalID });
  };

  stopCount(timerID){
    if (timerID != null){
      clearInterval(timerID);
    }
  };

  resetCount(timerID){
    if (timerID != null){
      this.stopCount(timerID);
      this.setState({ counter: 0 });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          defaultValue={"How long is your session?"}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.startCount.bind(this, this.state.setIntervalID)}>
            <View style={styles.circleButton}>
              <Text style={styles.buttonText}>15</Text>
            </View>
          </TouchableOpacity>          
          <TouchableOpacity onPress={this.stopCount.bind(this, this.state.setIntervalID)}>
            <View style={styles.circleButton}>
              <Text style={styles.buttonText}>30</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.resetCount.bind(this, this.state.setIntervalID)}>
            <View style={styles.circleButton}>
              <Text style={styles.buttonText}>60</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.props.navigator.push({title:'meditationTimer'})}>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
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
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer: {
    flex:0,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  circleButton: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:55,
    height:55,
    borderRadius:50,
    backgroundColor:'#FF5722',
  },
  buttonText: {
    color:"white",
    opacity:.8
  },
  startButton: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:55,
    height:55,
    borderRadius:50,
    opacity:.3,
    backgroundColor:'#8BC34A',
  },
  startButtonText: {
    color:"white",
  },
});
