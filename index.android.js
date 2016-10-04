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

  resetCount(timerID){
  	if (timerID != null){
  		clearInterval(timerID);
  	}
  	// return this.setState({ counter: 0});
  	// return console.log("why me");
  };

	componentWillMount(){
   let setIntervalID = setInterval(() => {
      this.setState({ counter: this.state.counter+1 });
    }, 1000);
   this.setState({ setIntervalID: setIntervalID });
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
            <TouchableNativeFeedback onPress={this.resetCount.bind(this, this.state.setIntervalID)}>
              <View style={{borderWidth:1, padding:10, margin:10}}>
                <Text>resets</Text>
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



/*
    	<View style={{flex:1,flexDirection: 'column',borderWidth:0, alignItems:'center', justifyContent:'center'}}>
	    	<View style={{padding:10}}>
	    		<Text style={styles.header}>This is where main page things will go</Text>
	    	</View>
	    	<TouchableNativeFeedback>
		    	<View style={{borderWidth:1, padding:10, margin:10}}>
		      	<Text>This is a button</Text>
		      </View>
	      </TouchableNativeFeedback>				
	      <TouchableNativeFeedback>
		    	<View style={{borderWidth:1, padding:10, margin:10}}>
		      	<Text>This is a button</Text>
		      </View>
	      </TouchableNativeFeedback>
      </View>

     */

/*

class TextInputBox extends Component {
	constructor(props) {
		super(props);
		this.state = {text:''};
	}

	render(){
		return (
			<View style={{padding:10}}>
				<TextInput
					style={{height:40}}
					placeholder="Type here!"
					onChangeText={(text)=> this.setState({text})}
				/>
				<Text>
					{this.state.text}
				</Text>
			</View>
		)
	}
}

class Greetings extends Component {
	render(){
		return (
			<Text style={this.props.style}>Hello {this.props.name}</Text>
		);
	}
}

class Box extends Component {
	render(){
		return <View style={{width: 75, height: 50, backgroundColor: 'darkblue'}} />
	}
}

class BigBox extends Component {
	render(){
		return <View style={{width: 75, height: 50, backgroundColor: 'powderblue'}} />
	}
}
*/