import React, { Component } from 'react'
import { Animated, PanResponder, TouchableWithoutFeedback, View } from 'react-native'

export default class Stripe extends Component {
  constructor() {
    super()
    this.state = {
      touched: false
    }
  }

  componentWillMount() {
    this.springValue = new Animated.Value(50)
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.setState({touched:true})
        //should set some sort of visual feedback
      },
      onPanResponderRelease: (evt, gestureState) => {
        const dyOrDx = this.props.orientation == 'portrait' ? 'dy' : 'dx'
        if (gestureState[dyOrDx] < -5 && this.props.isEnabled) {
          this.props._toggleStripe(this.props.identity)
        } else if (gestureState[dyOrDx] > 5 && !this.props.isEnabled) {
          this.props._toggleStripe(this.props.identity)
        } else if (this.props.isEnabled) {
          this.props._activateStripe(this.props.identity)
        } 
        this.setState({touched:false})
      }
    })
  }

  componentDidUpdate(prevProps) {
    !prevProps.isActive && this.props.isActive && this.spring()
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
      <View style={{flex: 1}}  {...this.panResponder.panHandlers}>
        <Animated.View style={{
          flexDirection: portrait ? 'column' : 'row',
          height: portrait ? this.springValue : 43, 
          width: portrait ? 45 : this.springValue}}>

             <View style={{flex: 4, backgroundColor: this.props.color}} />
          {!this.props.isActive && <View style={{flex: 1}} />}
          {!this.props.isEnabled && <View style={{flex: 1}} />}
        </Animated.View>
      </View>
    )
  }
}


