import React, { Component } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'

export default class Stripe extends Component {
  constructor() {
    super()
    this.springValue = new Animated.Value(50)
  }

  componentDidUpdate(prevProps) {
    !prevProps.isActive && this.props.isActive && this.spring()
    !prevProps.isEnabled && this.props.isEnabled && this.spring()
  }

  spring() {
    this.springValue.setValue(45)
    Animated.spring(
      this.springValue,
      {
        toValue: 50,
        friction: 1,
        tension: 1.5
      }
    ).start()
  }

  render() {
    const portrait = this.props.orientation == 'portrait'
    return (
      <View style={{flex: 1}} >
        <Animated.View style={{
          flexDirection: portrait ? 'column' : 'row',
          height: portrait ? this.springValue : 45, 
          width: portrait ? 45 : this.springValue}}>
          <TouchableOpacity 
            onPress={() => this.props._toggleStripe(this.props.identity)} 
            style={{flex: 4, backgroundColor: this.props.color}} />
          {!this.props.isActive && <View style={{flex: 1}} />}
          {!this.props.isEnabled && <View style={{flex: 1}} />}
        </Animated.View>
      </View>
    )
  }
}


