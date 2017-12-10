import React, { Component } from 'react'
import { Alert, Animated, Easing, Image, StyleSheet, TouchableOpacity } from 'react-native'

export default class AudioButton extends Component {
  constructor() {
    super()
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
        easing: Easing.linear
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
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
      })
    return (
      <TouchableOpacity 
        disabled={this.props.disabled}
        onPress={this._playSound}
        onLongPress={this.props.size == 'small' ? this.props._checkIfCorrect : this._showPronunciation}
        style={styles[this.props.size]} >
        <Animated.Image 
          style={[styles[this.props.size], {transform: [{rotate: spin}]} ]}
          resizeMode='contain'
          source={require('../../assets/pictures/800px-circle-Flag_of_Hong_Kong.png')} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  small: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  large: {
    width: 180,
    height: 180,
    borderRadius: 100,
  }
})
