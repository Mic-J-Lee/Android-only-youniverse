import React, { Component } from 'react';
import { AppRegistry, View, Alert } from 'react-native';
import Rainbow from './components/Rainbow/Rainbow';

export default class App extends Component {
  constructor() {
    super();
    const orangeThroughPurple = {active: false, enabled: true}
    this.state = {
      activeMode: 'red',
      rainbowStatus: {
        red: {
          active: true,
          enabled: true
        },
        orange: orangeThroughPurple,
        yellow: orangeThroughPurple,
        green: orangeThroughPurple,
        blue: orangeThroughPurple,
        purple: orangeThroughPurple
      }
    };
  }

  // _toggleStripe = (color) => {
  //   const NewRainbowStatus = update(this.state.rainbowStatus, {
  //     red: {$toggle: ['enabled']}
  //   })
  //   this.setState({
  //     rainbowStatus: NewRainbowStatus
  //   })
  // }

  // _nextMode() {
  //   const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
  //   this.setState
  // }

  render() {
    return (
      <View style={[{flex:1}]}>
        <Rainbow style={{flex: 1}} 
                 rainbowStatus={this.state.rainbowStatus} 
                 _toggleStripe={this._toggleStripe} />
        <View style={{flex: 4, backgroundColor: 'powderblue'}} />
        <View style={{flex: 5, backgroundColor: 'red'}} />
      </View>
    );
  }
}



AppRegistry.registerComponent('YouNiVerse', () => App);
