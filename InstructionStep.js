import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, LayoutAnimation, UIManager, Touc } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class InstructionStep extends Component {
	render() {
		return (
			<View>
	      <TouchableOpacity onPress={this.props.onPressHandler}>
	        <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight:16 }}>
	          <Text style={styles.header}>Find comfortable seating</Text>
	          <Icon style={this.props.iconStyle} name="chevron-right" size={20} />
	        </View>
	      </TouchableOpacity>  
        <Text style={this.props.textStyle}>
          You can sit in a chair, on a cushion, or just on the ground.{"\n"}{"\n"}
          The idea is to be comfortable but not enough where you are falling asleep.
        </Text>
       </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',

  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  smallCircleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 22,
    elevation: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 5,
    opacity: 1,
    color: '#424242',
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 16,
    color: '#424242',
    opacity: 0.75,
  },
});