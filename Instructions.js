import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, LayoutAnimation, UIManager } from 'react-native';
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
    marginLeft: 8,
    color: '#424242',
    opacity: 0.75,
  },
});

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: {
        text0: 0,
        text1: 0,
        text2: 0,
      },
      h: [0,0,0]
    }
    this.popit = this.popit.bind(this);
    UIManager.setLayoutAnimationEnabledExperimental && 
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount() {
    console.log("on will mount "+this.state.h)
    // Animate creation
    LayoutAnimation.spring();
  }

  popit() {
    return this.props.navigator.pop();
  }

  onPressAnimation(index) {
    LayoutAnimation.spring();
    // console.log(this.state.t[0])
    // let newarr = this.state.h.slice()
    // console.log("this is newarr "+newarr)
    
    // newarr[index] = ((this.state.h[index] - 50) * -1);
    // newarr[index] = 50;

    // console.log("this is new newarr "+newarr)
    // this.setState({ h:newarr });
    // console.log("this is new h "+this.state.h)
    if (index !== -1) {
      // let newArray = this.state.h.slice();
      // let num =  this.state.h[index];
      
      // newArray[index] = ((num - 50) * -1);
      // this.setState({ h:newArray });

      // const collection = this.state.h.splice()
      console.log("what is here at index 0? " + this.state.h[index]);
      
      // let num = (this.state.h[index] - 50) * -1;
      
      // console.log("num " + num)
      let updateQuery = {}
      updateQuery[index] = { $set: (this.state.h[0] + 1) * -1 };

      const newCollection = update(this.state.h, updateQuery);
      
      this.setState({h:newCollection})
      
      console.log(this.state.h)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}>
          <Text style={[styles.header, { fontSize: 40, color: '#8BC34A' }]}>How to Meditate</Text>

          <Text
            style={styles.header}
            onPress={this.onPressAnimation.bind(this, 0)}
          >Find a comfortable seated position.</Text>
          <Text style={[styles.text, { height: this.state.h[0] }]}>
          You can sit in a chair, on a cushion, or just on the ground. The idea is to be comfortable but not enough where you are falling asleep.
          </Text>
          
          <Text style={styles.header}>Keep your back straight.</Text>
          <Text style={styles.text}>
          Inhale, roll the shoulders up to your ears. Exhale, roll them back and down. This positions the head atop your neck while floating the shoulders over the hips.{"\n"}{"\n"}
          Consider this a neutral, tall spine. When you feel yourself hunching or slumping, reset your position with this method.
          </Text>

          <Text style={styles.header}>Close your eyes.</Text>
          <Text style={styles.text}>Gently close your eyes, the idea is to block out potential visual stimuli.</Text>
          <Text style={styles.header}>Maintain a simple breath.</Text>
          <Text style={styles.text}>Try for a steady deep breath. Nasal breathing makes it easier to find a smooth, even pace.</Text>
          <Text style={styles.header}>Focus on breathing.</Text>
          <Text style={styles.text}>Focus solely on the feeling of the air entering and exiting your nostrils.</Text>
          <Text style={styles.header}>Maintain focus.</Text>
          <Text style={styles.text}>
            Your mind will naturally wander and thoughts will bubble into your consciousness. This is expected.{"\n"}{"\n"}
            When you realize awareness has drifted, acknowledge the thoughts, let them pass as you gently guide your focus back to the breath.
          </Text>
          <Text style={styles.header}>Give it time.</Text>
          <Text style={styles.text}>
            Meditation takes practice and at times can be frustrating trying to maintain focus. However continual practice will substantially help in this regard.{"\n"}{"\n"}
            A session of 10 minutes a day has shown to improve many facets of mental and physical well being when done consistently.
          </Text>
          <Text style={[styles.text, { marginTop: 15, marginBottom: 15, textAlign: 'center', fontWeight: '900' }]}>You can do it!</Text>
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
