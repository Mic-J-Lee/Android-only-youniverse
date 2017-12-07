import React, { Component } from 'react';
import { AppRegistry, View, Alert } from 'react-native';
import Rainbow from './components/Rainbow/Rainbow';
import AudioToPicture from './screens/AudioToPicture/AudioToPicture'

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
    if (!Object.values(rainbowStatusClone).includes(true))
      Alert.alert('You must have at least 1 active color!')
    else if (color == this.state.activeColor) {
      this._nextMode()
      this.setState({rainbowStatus: rainbowStatusClone})
    } else
      this.setState({rainbowStatus: rainbowStatusClone})
  }

  _nextMode() {
    const modes = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    currentMode = modes.indexOf(this.state.activeColor)
    currentMode == 5 ? nextMode = 0 : nextMode = currentMode + 1
    nextModeIsFound = false
    while (nextModeIsFound == false) {
      if (this.state.rainbowStatus[modes[nextMode]] == true) 
        nextModeIsFound = true 
      else if (nextMode == 5)
        nextMode = 0
      else
        nextMode++
    }
    this.setState({activeColor: modes[nextMode]})
  }

  render() {
    return (
      <View style={[{flex:1}]}>
        <Rainbow style={{flex: 1}}
                 activeColor={this.state.activeColor} 
                 rainbowStatus={this.state.rainbowStatus} 
                 _toggleStripe={this._toggleStripe.bind(this)} />
        <View style={{flex: 9, backgroundColor: 'powderblue'}}>
          {this.state.activeColor == 'red' && <AudioToPicture/>}
        </View>
      </View>
    );
  }
}



AppRegistry.registerComponent('YouNiVerse', () => App);
