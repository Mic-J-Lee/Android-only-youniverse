import React, { Component } from 'react'
import { Alert, Animated, Easing, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { styles } from './styleModule'
import Sound from 'react-native-sound'


export default class AudioButton extends Component {
  componentWillMount() {
    this.spinValue = new Animated.Value(0)
    setTimeout(()=> this._loadSound(), Math.random() * (500 - 100) + 100)
  }

  _loadSound(language = 'cantonese') {
    this.fileName = language + '_' + this.props.sound + '.mp3'
    this.whoosh = new Sound(
      this.fileName,
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load ' + this.fileName, error)
          return
        }
        console.log('loaded ' + this.fileName + ', seconds: ' + this.whoosh.getDuration() + ', channels:' + this.whoosh.getNumberOfChannels())
        this._spin()
      }
    )
    // this.whoosh = new Sound(language + '_' + this.props.sound + '.mp3', Sound.MAIN_BUNDLE)
  }

  _spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this._spin())
  }

  _showPronunciation = () => {
    Alert.alert(this.props.sound)
  }

  _playSound = () => {
    if (this.whoosh) {
      if (this.whoosh._filename.split('_')[this.whoosh._filename.split('_').length - 1] != this.props.sound) {
        Alert.alert("ERROR: Sound doesn't match file!!! Hold down sound button to see actual sound")
      }
      this.whoosh.play((success) => {
        if (!success) {
          this.whoosh.reset()
          console.log('couldnt play ' + this.whoosh._filename)
        }
      })
    } else {
      console.log('there is no this.whoosh!')
    }
  }

  componentWillUnmount() {
    this.whoosh && this.whoosh.release()
  }

  render() {
    const spin = this.props.disabled ? '0deg' : this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
      })
    return (
      <TouchableOpacity 
        disabled={this.props.disabled}
        onPress={this._playSound}
        onLongPress={this.props.size == 'small' ? this.props._checkIfCorrect : this._showPronunciation}
        style={[styles[this.props.size + 'Circle'], {justifyContent: 'center', alignItems: 'center'} ]} >
        <Animated.Image 
          style={[styles[this.props.size + 'Circle'], {transform: [{rotate: spin}], opacity: this.props.disabled ? .5 : 1} ]}
          resizeMode='contain'
          source={require('../../assets/pictures/800px-circle-Flag_of_Hong_Kong.png')} />
        {this.props.disabled && <Image source={require('../../assets/pictures/red_x.png')} style={styles.redX} />} 
      </TouchableOpacity>
    )
  }
}
