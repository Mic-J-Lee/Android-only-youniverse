import React, { Component } from 'react';
import { TouchableOpacity, Image, Alert } from 'react-native';
import Sound from 'react-native-sound';

export default class AudioButton extends Component {
  constructor(props) {
    super(props);
    const mySound = this.props.sound
    const whoosh = new Sound('cantonese_' + mySound + '.mp3', Sound.MAIN_BUNDLE)
    this.state = {
      soundObject: whoosh,
      sound: this.props.sound
    };
  }

  _showPronunciation = () => {
    Alert.alert(this.props.sound)
  }

  _playSound() {
    whoosh = this.state.soundObject
    whoosh.play((success) => {if (!success) whoosh.reset() })
  }

  componentWillUnmount() {
    whoosh = this.state.soundObject
    whoosh.release()
  }

  render() {
    return (
      <TouchableOpacity onPress={this._playSound.bind(this)}
                        onLongPress={this._showPronunciation.bind(this)}>
        <Image style={{flex: 1,}}
               resizeMode='contain' 
               source={require(`../../assets/pictures/800px-circle-Flag_of_Hong_Kong.png`)} />
      </TouchableOpacity>
    );
  }
}
