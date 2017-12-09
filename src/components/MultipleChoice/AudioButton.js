import React, { Component } from 'react';
import { TouchableOpacity, Image, Alert, View, StyleSheet } from 'react-native';

export default class AudioButton extends Component {
  _showPronunciation = () => {
    Alert.alert(this.props.sound)
  }

  _checkIfCorrect = () => {
    if (this.props.isCorrect) this.props._nextColor()
  }

  _playSound = () => {
    whoosh = this.props.soundObject
    whoosh.play((success) => {if (!success) whoosh.reset() })
  }

  componentWillUnmount() {
    whoosh = this.props.soundObject
    whoosh.release()
  }

  render() {
    return (
      <TouchableOpacity onPress={this._playSound}
                        onLongPress={this.props.size == 'small' ? this._checkIfCorrect : this._showPronunciation}
                        style={styles[this.props.size]} >
          <Image style={styles[this.props.size]}
                 resizeMode='contain' 
                 source={require(`../../assets/pictures/800px-circle-Flag_of_Hong_Kong.png`)} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  small: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  large: {
    width: 150,
    height: 150,
    borderRadius: 100,
  }
})
