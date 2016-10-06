import React, { Component } from 'react';
import { TouchableNativeFeedback, Navigator, AppRegistry, Text, View, StyleSheet, TextInput } from 'react-native';

import MeditationTimerScene from './MeditationTimerScene';
import AnimationStation from './AnimationStation';
import Dashboard from './Dashboard';

class ohmmi extends Component {

  componentWillReceiveProps(props){
    // console.log(props);
  };

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.title) {
      case 'Dashboard':
        return (<Dashboard navigator={navigator}/>);
      case 'AnimationStation':
        return (<AnimationStation navigator={navigator} title="second" />);
    }
  }  

  render() {
    return (
				<Navigator
					initialRoute={{ title:'Dashboard', index:0 }}
				  configureScene={(route, routeStack) =>
				    Navigator.SceneConfigs.FloatFromBottom}
					renderScene={this.navigatorRenderScene }
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