import React, { Component } from 'react';
import { TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

import MyScene from './MyScene';



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

class ohmmi extends Component {
  render() {
    return (
    	<View style={{flex:1,flexDirection: 'column',borderWidth:0, alignItems:'center', justifyContent:'center'}}>
	    	<View style={{padding:10}}>
	    		<Text style={styles.header}>This is where main page things will go</Text>
	    	</View>
	    	<TouchableNativeFeedback>
		    	<View style={{borderWidth:1, padding:10}}>
		      	<Text>This is a button</Text>
		      </View>
	      </TouchableNativeFeedback>
      </View>
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
