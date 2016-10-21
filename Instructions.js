import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, BackAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <ScrollView contentContainerStyle={{marginLeft:16, marginRight:16}}>
            <Text style={[styles.header, { fontSize:40, color: '#8BC34A'}]}>How to Meditate</Text>
            <Text style={ styles.header }>Find a comfortable seated position.</Text>
            <Text style={ styles.text }>
            You can sit in a chair, on a cushion, or just on the ground. The idea is to be comfortable but not enough where you are falling asleep.
            </Text>
            
            <Text style={ styles.header }>Keep your back straight.</Text>
            <Text style={ styles.text }>
            Inhale, roll the shoulders up to your ears. Exhale, roll them back and down. This positions the head atop your neck while floating the shoulders over the hips.{"\n"}{"\n"}
            Consider this a neutral, tall spine. When you feel yourself hunching or slumping, reset your position with this method.
            </Text>

            <Text style={ styles.header }>Close your eyes.</Text>
            <Text style={ styles.text }>Gently close your eyes, the idea is to block out potential visual stimuli.</Text>

            <Text style={ styles.header }>Maintain a simple breath.</Text>
            <Text style={ styles.text }>Try for a steady deep breath. Nasal breathing makes it easier to find a smooth, even pace.</Text>
            
            <Text style={ styles.header }>Focus on breathing.</Text>
            <Text style={ styles.text }>Focus solely on the feeling of the air entering and exiting your nostrils.</Text>
            
            <Text style={ styles.header }>Maintain focus.</Text>
            <Text style={ styles.text }>
              Your mind will naturally wander and thoughts will bubble into your conciousness. This is expected.{"\n"}{"\n"}
              When you realize awareness has drifted, acknowledge the thoughts, let them pass as you gently guide your focus back to the breath.
            </Text>
            <Text style={ styles.header }>Give it time.</Text>
            <Text style={ styles.text }>
            Meditation takes practice and at times can be frustrating trying to maintain focus. However continual practice will substantially help in this regard.{"\n"}{"\n"}
            A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consitently.
            </Text>
            <Text style={ styles.text, {marginTop:15, marginBottom:15, textAlign:'center', fontWeight:'900'} }>You can do it!</Text>
        </ScrollView>
          <View style={ {backgroundColor:'#F5F5F5', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: '#E0E0E0'} }>
            <TouchableOpacity onPress={ this.popit.bind(this) }>
              <View style={ [styles.smallCircleButton, { backgroundColor:'#F8BBD0'}] }>
                <Icon name="undo" size={30} color="#F5F5F5" />
              </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5F5F5',
  },
  buttonContainer: {
    flex:1,
    alignItems:'center',
  },
  smallCircleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop:15,
    marginBottom: 22,
    elevation: 4,
  },
  header: { 
    fontSize: 20,
    fontWeight:'900',
    marginBottom: 5,
    opacity:1,
    color: '#424242',
  },
  text: {
    fontSize: 15, 
    marginBottom:10,
    marginLeft: 8,
    color: '#424242',
    opacity: 0.75,
  }
});

Instructions.propTypes = {
    navigator: PropTypes.object.isRequired,
  }