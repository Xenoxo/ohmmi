import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, BackAndroid } from 'react-native';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this._popit = this.popit.bind(this);
  }

  popit() {
    return this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        {/*<InstructionsHelper backHandler={ this.poop.bind(this) } />*/}
        <View style={ styles.subcontainer }>
          <TouchableOpacity onPress={ this.popit.bind(this) }>
            <View style={[styles.smallCircleButton, { backgroundColor:'#F8BBD0'}]}>
              <Text style={ styles.buttonText }>?</Text>
            </View>
          </TouchableOpacity>   
        </View>
      </View>
    )
  }
}

class InstructionsHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return <Text>Test</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5F5F5',
  },
  progressContainer: {
    flex:2,
    alignItems:'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex:1,
    alignItems:'center',
    // justifyContent: 'center',
  },
  circleButton: {
    flex: 1,
    width: 85,
    height: 85,    
    backgroundColor:'#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 16,
    elevation: 4,
  },
  smallCircleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    margin:5,
    elevation: 4,
  },  
  pause: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:45,
    height:45,
    opacity: .8
  },
  resume: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 40,
    marginLeft:15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    opacity: .8,
    transform: [
      {rotate: '90deg'}
    ]
  }
});

Instructions.propTypes = {
    navigator: PropTypes.object.isRequired,
  }