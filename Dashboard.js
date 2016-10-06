import React, { Component, PropTypes } from 'react';
import { Aniimation, TouchableNativeFeedback, View, Text, TouchableHighlight } from 'react-native';

import TimerMixin from 'react-timer-mixin';

export default class Dashboard extends Component {
  mixins: [TimerMixin]
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
      <View>
        <Text>Counter = {this.state.counter} The prop date is {this.props.timenow} title is {this.props.title}</Text>
        <Text>Timer buttons</Text>
        <TouchableNativeFeedback onPress={this.startCount.bind(this, this.state.setIntervalID)}>
          <View style={{borderWidth:1, padding:10, margin:10}}>
            <Text>Start</Text>
          </View>
        </TouchableNativeFeedback>          
        <TouchableNativeFeedback onPress={this.stopCount.bind(this, this.state.setIntervalID)}>
          <View style={{borderWidth:1, padding:10, margin:10}}>
            <Text>Stops</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this.resetCount.bind(this, this.state.setIntervalID)}>
          <View style={{borderWidth:1, padding:10, margin:10}}>
            <Text>Reset</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.props.navigator.push({title:'Scene2'})}>
          <View>
            <Text>Return home</Text>
           </View>
        </TouchableNativeFeedback>                 
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

      // <View>
      //   <Text>Counter = {this.state.counter} The prop date is {this.props.timenow} title is {this.props.title}</Text>
      //   <Text>Timer buttons</Text>
      //   <TouchableNativeFeedback onPress={this.startCount.bind(this, this.state.setIntervalID)}>
      //     <View style={{borderWidth:1, padding:10, margin:10}}>
      //       <Text>Start</Text>
      //     </View>
      //   </TouchableNativeFeedback>          
      //   <TouchableNativeFeedback onPress={this.stopCount.bind(this, this.state.setIntervalID)}>
      //     <View style={{borderWidth:1, padding:10, margin:10}}>
      //       <Text>Stops</Text>
      //     </View>
      //   </TouchableNativeFeedback>
      //   <TouchableNativeFeedback onPress={this.resetCount.bind(this, this.state.setIntervalID)}>
      //     <View style={{borderWidth:1, padding:10, margin:10}}>
      //       <Text>Reset</Text>
      //     </View>
      //   </TouchableNativeFeedback>
      //   <TouchableNativeFeedback onPress={() => this.props.navigator.push({title:'Scene2'})}>
      //     <View>
      //       <Text>Go to scene2</Text>
      //      </View>
      //   </TouchableNativeFeedback>                 
      // </View>