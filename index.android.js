import React, { Component } from 'react';
import { Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

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
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) =>
          <MyScene
            title={route.title}

            // Function to call when a new scene should be displayed           
            onForward={ () => {    
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
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
		marginLeft: 10,
	},
});



AppRegistry.registerComponent('ohmmi', () => ohmmi);