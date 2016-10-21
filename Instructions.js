import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, BackAndroid } from 'react-native';

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
        <ScrollView contentContainerStyle={{borderWidth:1}}>
            <Text>
            1. Find a comfortable seated position that's not too comfortable.
            You can sit in a chair, on a cushion, or just on the ground. The idea is to be comfortable but not enough where you are falling asleep.
            </Text>
            <Text>
            2. Keep a tall spine.
            Inhale, roll the shoulders up to your ears. Exhale, roll them bad boys back and down. This stacks the head atop your neck while floating the shoulders over hips. Consider this a neutral, tall spine.
            When you feel yourself hunching or slumping, reset your position with this method.
            </Text>
            
            <Text>
            3. Gently close the eyes.
            </Text>
            
            <Text>
            4. Maintain a simple breath.
            Try for a steady deep breath. Nasal breathing makes it easier to find a smooth, even pace.</Text>
            <Text>
            5. Focus on your breathing.
            Focus solely on the feeling of the air entering and exiting your nostrils.
            </Text>
            <Text>
            6. Maintain focus.
            Your mind will naturally wander and thoughts will bubble into your conciousness. This is expected. When you realize awareness has drifted, acknowledge the thoughts, let them pass as you gently guide your focus back to the breath.
            </Text>
            <Text>
            7. Give it time.
            Meditation takes practice and at times can be frustrating in maintaining focus. However, this is natural and expected. A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consitently.
            </Text>
            <Text>
            7. Give it time.
            Meditation takes practice and at times can be frustrating in maintaining focus. However, this is natural and expected. A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consitently.
            </Text>
            <Text>
            7. Give it time.
            Meditation takes practice and at times can be frustrating in maintaining focus. However, this is natural and expected. A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consitently.
            </Text>          
            <Text>
            7. Give it time.
            Meditation takes practice and at times can be frustrating in maintaining focus. However, this is natural and expected. A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consitently.
            </Text>
            <Text>
            7. Give it time.
            Meditation takes practice and at times can be frustrating in maintaining focus. However, this is natural and expected. A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consitently.
            </Text>
            <Text>
            7. Give it time.
            Meditation takes practice and at times can be frustrating in maintaining focus. However, this is natural and expected. A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consitently.
            </Text>
          {/*<InstructionsHelper backHandler={ this.poop.bind(this) } />*/}

        </ScrollView>
          <TouchableOpacity onPress={ this.popit.bind(this) }>
              <View style={[styles.smallCircleButton, { backgroundColor:'#F8BBD0'}]}>
                <Text style={ styles.buttonText }>?</Text>
              </View>
            </TouchableOpacity>           
        <Text>asdf</Text>
{/*        <View style={ styles.subcontainer }>
            
          </View>*/}
      </View>
    )
  }
}

// class InstructionsHelper extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {}
//   }

//   componentDidMount() {
//   }

//   render() {
//     return <Text>Test</Text>
//   }
// }

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