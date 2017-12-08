import React, { Component } from 'react';
import { View } from 'react-native';
import AudioButton from '../../components/AudioButton/AudioButton'

export default class AudioToPicture extends Component {
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
          <AudioButton sound='jat1' />
        </View>
        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
          <AudioButton sound='ji6' />
        </View>
        <View style={{flex: 6, alignItems: 'center', justifyContent: 'center'}}>
          <AudioButton sound='saam1' />
        </View>
      </View>
    );
  }
}


