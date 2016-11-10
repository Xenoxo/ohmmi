import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, LayoutAnimation, UIManager } from 'react-native';
import InstructionStep from './InstructionStep.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import update from 'immutability-helper';

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
  headerContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight:16,
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

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // h: [0,0,0,0,0,0,0]
    }
    // this.popit = this.popit.bind(this);
    // UIManager.setLayoutAnimationEnabledExperimental && 
    // UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount() {
    LayoutAnimation.spring();
  }

  popit() {
    return this.props.navigator.pop();
  }

  onPressAnimation(index) {
    LayoutAnimation.spring();
    if (index !== -1) {
      let updateQuery = {}
      updateQuery[index] = { $set: (this.state.h[index] + 1) * -1 };
      const newCollection = update(this.state.h, updateQuery);
      this.setState({h:newCollection})
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>This is the stats page</Text>
      </View>
    );
  }
}

Stats.propTypes = {
    navigator: PropTypes.object.isRequired,
};
