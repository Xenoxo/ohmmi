import React, { Component } from 'react';
import { TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import MyScene from './MyScene';

import MeditationTimerScene from './MeditationTimerScene';

class ohmmi extends Component {
	mixins: [TimerMixin]
  constructor(props) {
    super(props);
    this.state = {
    	theTime: "not needed",
    	counter:1,
    	setIntervalID: null,
    };
  };

  beginTimer(){
   }

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
  		clearInterval(timerID);
			this.setState({ counter: 1 });
  	}
  };

	componentWillMount(){

	}

  componentWillReceiveProps(props){
    // console.log(props);
  };

  render() {
    return (
				<Navigator
					initialRoute={{ title:'Homescene', index:0 }}
				  configureScene={(route, routeStack) =>
				    Navigator.SceneConfigs.FloatFromBottom}				
					
					renderScene={(route, navigator) =>
						<View>
							<Text>Counter = {this.state.counter} The prop date is {this.props.timenow} title is {this.props.title}</Text>
								<MeditationTimerScene
									counter={this.state.counter}
									timenow={this.state.theTime}
									title={route.title}
									routeIndex={route.index}
									onForward={ () => {
										const nextIndex = route.index + 1;
										navigator.push({
											title:'Scene ' + nextIndex,
											index: nextIndex,
										})
									}}

									onBack={ () => {
			              if (route.index > 0) {
			                navigator.pop();
			              }
									}}							
								/>
					<Text>The is text on the bottom</Text>
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
          </View>
					}
				/>
    )
  }
}

const styles = StyleSheet.create({
	header: {
		color: '#DC3522',
		fontFamily: 'roboto',
		fontSize: 30,
		textAlign: 'center',
	},
});



AppRegistry.registerComponent('ohmmi', () => ohmmi);