import React, { Component } from 'react'
import { Alert, Animated, Easing, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { styles } from './styleModule'
import Sound from 'react-native-sound'


export default class AudioButton extends Component {
  componentWillMount() {
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    setTimeout(()=>this.whoosh = new Sound('cantonese' + '_' + this.props.sound + '.mp3', Sound.MAIN_BUNDLE),800)
    this._spin()
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
    this.whoosh.play((success) => {if (!success) this.whoosh.reset() })
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
