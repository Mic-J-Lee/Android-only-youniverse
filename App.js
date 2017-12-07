import React, { Component } from 'react';
import { AppRegistry, View, Alert } from 'react-native';
import Rainbow from './components/Rainbow/Rainbow';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeColor: 'red',
      rainbowStatus: {
        red: true,
        orange: true,
        yellow: true,
        green: true,
        blue: true,
        purple: true
      }
    };
  }

  _toggleStripe(color) {
    let rainbowStatusClone = {...this.state.rainbowStatus}
    rainbowStatusClone[color] = !rainbowStatusClone[color]
    this.setState({rainbowStatus: rainbowStatusClone})
  }

  // _updateGuessedLetters(letter) {
  //   let guessedLettersClone = [...this.state.guessedLetters]
  //   guessedLettersClone.push(letter)
  //   this.setState({guessedLetters: guessedLettersClone})
  // }

  // _nextMode() {
  //   const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
  //   this.setState
  // }

  render() {
    return (
      <View style={[{flex:1}]}>
        <Rainbow style={{flex: 1}}
                 activeColor={this.state.activeColor} 
                 rainbowStatus={this.state.rainbowStatus} 
                 _toggleStripe={this._toggleStripe.bind(this)} />
        <View style={{flex: 4, backgroundColor: 'powderblue'}} />
        <View style={{flex: 5, backgroundColor: 'red'}} />
      </View>
    );
  }
}



AppRegistry.registerComponent('YouNiVerse', () => App);
