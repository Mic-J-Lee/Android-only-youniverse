import React, { Component } from 'react'
import { Animated, PanResponder, TouchableWithoutFeedback, View } from 'react-native'

export default class Stripe extends Component {

  state = {
    touched: false
  }

  componentWillMount() {
    this.springValue = new Animated.Value(1)
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.setState({touched:true})
        //should set some sort of visual feedback
      },
      onPanResponderRelease: (evt, gestureState) => {
        const dyOrDx = this.props.orientation == 'portrait' ? 'dy' : 'dx'
        if (gestureState[dyOrDx] < -5 && this.props.isEnabled) {
          this.props._toggleStripe(this.props.color)
        } else if (gestureState[dyOrDx] > 5 && !this.props.isEnabled) {
          this.props._toggleStripe(this.props.color)
        } else if (this.props.isEnabled) {
          this.props._activateStripe(this.props.color)
        } 
        this.setState({touched:false})
      }
    })
  }

  componentDidUpdate(prevProps) {
    !prevProps.isActive && this.props.isActive && this._spring()
  }

  _spring() {
    this.springValue.setValue(.8)
    Animated.spring(
      this.springValue,
      {
        useNativeDriver:true,
        toValue: 1,
        friction: 1,
        tension: 1.5
      }
    ).start()
  }

  render() {
    const portrait = this.props.orientation == 'portrait'
    return (
      <View style={{flex: 1, flexDirection: portrait ? 'column' : 'row' }} {...this.panResponder.panHandlers}>
        <View style={{flex: 1, backgroundColor: this.props.displayedColor}} />
        <View style={{flex: 1}} />
        <View style={{flex: 1}} />
        <Animated.View style={{
          position: 'absolute',
          flexDirection: portrait ? 'column' : 'row',
          height: portrait ? 50 : 43,
          width: portrait ? 45 : 50,
          transform: [
            {scaleX: portrait ? 1 : this.springValue},
            {scaleY: portrait ? this.springValue : 1}
          ] }}>
             <View style={{flex: 4, backgroundColor: this.props.displayedColor}} />
          {!this.props.isActive && <View style={{flex: 1}} />}
          {!this.props.isEnabled && <View style={{flex: 1}} />}
        </Animated.View>
      </View>
    )
  }
}


