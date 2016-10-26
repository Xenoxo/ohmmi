import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, ScrollView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class InstructionStep extends Component {
	render() {
		return (
			<View>
	      <TouchableOpacity onPress={this.props.onPressHandler}>
	        <View style={this.props.headerContainerStyle}>
	          <Text style={this.props.headerStyle}>{ this.props.header }</Text>
	          <Icon style={this.props.iconStyle} name="chevron-right" size={20} />
	        </View>
	      </TouchableOpacity>  
        <Text style={this.props.textStyle}>
        	{ this.props.text }
        </Text>
       </View>
		);
	}
}
