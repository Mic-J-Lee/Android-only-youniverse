import React, { Component } from 'react';
import { AppRegistry, View, Alert } from 'react-native';
import Rainbow from './components/Rainbow/Rainbow';
import AudioToPicture from './screens/AudioToPicture/AudioToPicture'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeColor: 'red',
      rainbow: {
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
    let rainbowClone = {...this.state.rainbow}
    rainbowClone[color] = !rainbowClone[color]
    if (!Object.values(rainbowClone).includes(true))
      Alert.alert('You must have at least 1 active color!')
    else if (color == this.state.activeColor) {
      this._nextColor()
      this.setState({rainbow: rainbowClone})
    } else
      this.setState({rainbow: rainbowClone})
  }

  _nextColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    currentColor = colors.indexOf(this.state.activeColor)
    currentColor == 5 ? nextColor = 0 : nextColor = currentColor + 1
    nextColorIsFound = false
    while (nextColorIsFound == false) {
      if (this.state.rainbow[colors[nextColor]] == true) 
        nextColorIsFound = true 
      else if (nextColor == 5)
        nextColor = 0
      else
        nextColor++
    }
    this.setState({activeColor: colors[nextColor]})
  }

  render() {
    return (
      <View style={[{flex:1}]}>
        <Rainbow style={{flex: 1}}
                 activeColor={this.state.activeColor} 
                 rainbow={this.state.rainbow} 
                 _toggleStripe={this._toggleStripe.bind(this)} />
        <View style={{flex: 9, backgroundColor: 'powderblue'}}>
          {this.state.activeColor == 'red' && <AudioToPicture/>}
        </View>
      </View>
    );
  }
}



AppRegistry.registerComponent('YouNiVerse', () => App);
