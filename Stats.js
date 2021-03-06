import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, LayoutAnimation, UIManager, AsyncStorage } from 'react-native';
import InstructionStep from './InstructionStep.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import update from 'immutability-helper';
import AnimateNumber from 'react-native-animate-number'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',

  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 10,
  },
  smallCircleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 22,
    elevation: 4,
  },
  textBlockContainer: {
    flex:1,
    flexDirection:'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsText: {
    // flex:1,
    fontSize: 27,
    fontWeight: '500',
    color:'#616161',
  },
  statsNumber: {
    flex:1,
    fontSize: 75,
    textAlign: 'right',
    color:'#8BC34A',
    // borderWidth: 1,
  },
  postFix: {
    // borderWidth:1,
    fontSize: 12,
    width: 60,
    textAlign: 'left',
    marginTop: 40,
    marginLeft: 5,
    fontWeight: '500',
  }  
});

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStreak:'0',
      totalTime:'0',
      longestSession:'0',
      nest:'40',
    }
    this.popit = this.popit.bind(this);
    // this.eraseLocalData = this.eraseLocalData.bind(this);
  }

  componentWillMount() {
    AsyncStorage.multiGet(['currentStreak', 'totalTime', 'longestSession'], (err, stores) => {
     stores.map((result, i, store) => {
       let key = store[i][0];
       let value = store[i][1];
       let pair = {};
       if (key === 'longestSession'){
        value = value/60000;
       } else if (key === 'totalTime'){
        value = Math.round( parseFloat(value) * 10 ) / 10;
       } else if (key === 'currentStreak'){
        let tempArray = value.split('-');
        let sinceLast = Date.now() - parseInt(tempArray[1]);
        if (sinceLast > 115200000) {
         value = 0;
        } else {
          let tempArray = value.split('-');
          value = tempArray[0];
        }
       }
       pair[key] = value;
       this.setState(pair); // sets the state of the current key
      });
    }).done();
  }

  popit() {
    return this.props.navigator.pop();
  }

  // eraseLocalData() {
  //   AsyncStorage.multiSet([['currentStreak',null],['totalTime',null],['longestSession',null]]).done();
  // }

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
        <View style={[styles.subcontainer, {flex:2}]}>
          
          <View style={styles.textBlockContainer}>
            <Text style={styles.statsText}>Current{'\n'}Streak</Text>
            <Text style={[styles.statsText, styles.statsNumber]}>
              <AnimateNumber value={this.state.currentStreak} timing="linear" countBy={1}/>
            </Text>
            <Text style={[styles.postFix]}>days</Text>
            
          </View>

          <View style={styles.textBlockContainer}>
            <Text style={styles.statsText}>Total{'\n'}Time</Text>
            <Text style={[styles.statsText, styles.statsNumber]}>
              <AnimateNumber value={this.state.totalTime} timing="linear" countBy={1}/>
            </Text>
            <Text style={[styles.postFix]}>hours</Text>
          </View>
          
          <View style={styles.textBlockContainer}>
            <Text style={styles.statsText}>Longest{'\n'}Session</Text>
            <Text style={[styles.statsText, styles.statsNumber]}>
              <AnimateNumber value={this.state.longestSession} timing="linear" countBy={1}/>
            </Text>
            <Text style={[styles.postFix]}>minutes</Text>
          </View>
        </View>

        <View style={{ backgroundColor: '#F5F5F5', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: '#E0E0E0' }}>
          <TouchableOpacity onPress={this.popit} >
            <View style={[styles.smallCircleButton, { backgroundColor: '#F8BBD0' }]}>
              <Icon name="undo" size={30} color="#F5F5F5" />
            </View>
          </TouchableOpacity>
          
          {/*<TouchableOpacity onPress={this.eraseLocalData} >
            <View style={[styles.smallCircleButton, { backgroundColor: '#F8BBD0' }]}>
              <Icon name="times" size={30} color="#F5F5F5" />
            </View>
          </TouchableOpacity>*/}
        </View>
      </View>

    );
  }
}

Stats.propTypes = {
    navigator: PropTypes.object.isRequired,
};
