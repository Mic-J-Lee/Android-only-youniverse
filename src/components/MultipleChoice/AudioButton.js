import React, { Component } from 'react'
import { Alert, Animated, Easing, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { styles } from './styleModule'

export default class AudioButton extends Component {
  componentWillMount() {
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.spin()
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.spin())
  }

  _showPronunciation = () => {
    Alert.alert(this.props.sound)
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
    const spin = this.props.disabled ? '0deg' : this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
      })
    return (
      <TouchableOpacity 
        disabled={this.props.disabled}
        onPress={this._playSound}
        onLongPress={this.props.size == 'small' ? this.props._checkIfCorrect : this._showPronunciation}
        style={styles[this.props.size + 'Circle']} >
        <Animated.Image 
          style={[styles[this.props.size + 'Circle'], {transform: [{rotate: spin}]}, {opacity: this.props.disabled ? .5 : 1} ]}
          resizeMode='contain'
          source={require('../../assets/pictures/800px-circle-Flag_of_Hong_Kong.png')} />
      </TouchableOpacity>
    )
  }
}
