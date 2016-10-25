import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, LayoutAnimation, UIManager, Touc } from 'react-native';
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

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: [0,0,0,0,0,0,0]
    }
    this.popit = this.popit.bind(this);
    UIManager.setLayoutAnimationEnabledExperimental && 
    UIManager.setLayoutAnimationEnabledExperimental(true);
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
        <ScrollView contentContainerStyle={{ marginLeft: 16, marginRight: 16}}>
          <Text style={[styles.header, { fontSize: 40, color: '#8BC34A',}]}>How to Meditate</Text>
          
          <TouchableOpacity onPress={this.onPressAnimation.bind(this, 0)}>

            <Text style={styles.header}>Find comfortable seating.</Text>
            <Text style={[styles.text, { height: this.state.h[0] }]}>
              You can sit in a chair, on a cushion, or just on the ground.{"\n"}{"\n"}
              The idea is to be comfortable but not enough where you are falling asleep.
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this.onPressAnimation.bind(this, 1)}>
            <Text style={styles.header}>Keep your back straight.</Text>
            <Text style={[styles.text, { height: this.state.h[1] }]}>
              Inhale, roll the shoulders up to your ears. Exhale, roll them back and down. This positions the head atop your neck while floating the shoulders over the hips.{"\n"}{"\n"}
              Consider this a neutral, tall spine. When you feel yourself hunching or slumping, reset your position with this method.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressAnimation.bind(this, 2)}>
            <Text style={styles.header}>Close your eyes.</Text>
            <Text style={[styles.text, { height: this.state.h[2] }]}>Gently close your eyes, the idea is to block out potential visual stimuli.</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressAnimation.bind(this, 3)}>
            <Text style={styles.header}>Maintain a simple breath.</Text>
            <Text style={[styles.text, { height: this.state.h[3] }]}>Try for a steady deep breath. Nasal breathing makes it easier to find a smooth, even pace.</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressAnimation.bind(this, 4)}>
            <Text style={styles.header}>Focus on breathing.</Text>
            <Text style={[styles.text, { height: this.state.h[4] }]}>Focus solely on the feeling of the air entering and exiting your nostrils.</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressAnimation.bind(this, 5)}>           
            <Text style={styles.header}>When distracted, refocus.</Text>
            <Text style={[styles.text, { height: this.state.h[5] }]}>
              Your mind will naturally wander and thoughts will bubble into your consciousness. This is expected.{"\n"}{"\n"}
              When you realize awareness has drifted, acknowledge the thoughts, let them pass as you gently guide your focus back to the breath.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressAnimation.bind(this, 6)}>
            <Text style={styles.header}>Give it time.</Text>
            <Text style={[styles.text, { height: this.state.h[6] }]}>
              Meditation takes practice and at times can be frustrating trying to maintain focus. However, continual practice will substantially help in this regard.{"\n"}{"\n"}
              A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consistently.
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ backgroundColor: '#F5F5F5', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: '#E0E0E0' }}>
          <TouchableOpacity onPress={this.popit} >
            <View style={[styles.smallCircleButton, { backgroundColor: '#F8BBD0' }]}>
              <Icon name="undo" size={30} color="#F5F5F5" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Instructions.propTypes = {
    navigator: PropTypes.object.isRequired,
};
