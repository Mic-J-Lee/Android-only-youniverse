import React, { Component } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'

export default class Stripe extends Component {
  constructor() {
    super()
    this.springValue = new Animated.Value(60)
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
        toValue: 60,
        friction: 2
      }
    ).start()
  }

  render() {
    const portrait = this.props.orientation == 'portrait'
    return (
      <View style={{flex: 1, backgroundColor: 'powderblue'}} >
        <Animated.View style={{
          flexDirection: portrait ? 'column' : 'row',
          height: portrait ? this.springValue : 60, 
          width: portrait ? 60 : this.springValue}}>
          <TouchableOpacity 
            onPress={() => this.props._toggleStripe(this.props.identity)} 
            style={{flex: 4, backgroundColor: this.props.color}} />
          {!this.props.isActive && <View style={{flex: 1, backgroundColor: 'powderblue'}} />}
          {!this.props.isEnabled && <View style={{flex: 1, backgroundColor: 'powderblue'}} />}
        </Animated.View>
      </View>
    )
  }
}


