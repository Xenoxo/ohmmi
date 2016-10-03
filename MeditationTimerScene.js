import React, { Component, PropTypes } from 'react';
import { TouchableNativeFeedback, View, Text, TouchableHighlight } from 'react-native';

export default class MeditationTimerScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    routeIndex: PropTypes.number.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>The prop title is {this.props.title}</Text>
        { this.props.routeIndex == 0 ? (
        <TouchableNativeFeedback onPress={this.props.onForward}>
          <View style={{borderWidth:1, padding:10, margin:10}}>
            <Text>Go forward</Text>
          </View>
        </TouchableNativeFeedback>) : <Text></Text>}

        { this.props.routeIndex != 0 ? (
          <TouchableNativeFeedback onPress={this.props.onBack}>
            <View style={{borderWidth:1, padding:10, margin:10}}>
              <Text>Go back</Text>
            </View>
          </TouchableNativeFeedback> ) : <Text></Text>}
        


        
        <Text>The is the meditation timer scene</Text>
      </View>
    )
  }
}

/*{ if (this.props.routeIndex > 0) {}}

{ this.props.routeIndex == 0 ? (<Text>{this.props.routeIndex}</Text>) : '' }        


*/