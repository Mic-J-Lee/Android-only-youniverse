import React, { Component } from 'react'
import { Animated, Dimensions, PanResponder, Text, TouchableWithoutFeedback, View } from 'react-native'

export default class Menu extends Component {
  componentWillMount() {
    this.expandDown = new Animated.Value(0)
  }

  componentDidMount() {
    this._enter()
  }

  componentWillReceiveProps(newProps) {
    newProps.menu == 'leaving' && this._leave()
  }

  _enter() {
    this.expandDown.setValue(0)
    Animated.timing(
      this.expandDown,
      {
        toValue: 1,
        useNativeDriver: true,
        duration: 333
      }
    ).start()
  }

  _leave() {
    Animated.timing(
      this.expandDown,
      {
        toValue: 0,
        useNativeDriver: true,
        duration: 200
      }
    ).start(()=>{
      this.props._exitMenu()
      this.props._unpause()
    })
  }

  render() {
    let dim = Dimensions.get('screen')
    const translateX = this.expandDown.interpolate({ //testing
      inputRange: [0, .5, 1],
      outputRange: [-dim.width/2.38, 5, 5]
    })
    const translateY = this.expandDown.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [-dim.height/2.38, -dim.height/2.38, 5]
    })
    const scaleX = this.expandDown.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [.01, 1, 1]
    })
    const scaleY = this.expandDown.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [.01, .01, 1]
    })
    const opacity = this.expandDown.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [0, .85, .93]
    })
    return (
      <Animated.View style={{
        height: dim.height - 30, 
        width: dim.width - 10,
        backgroundColor: 'black',
        opacity: opacity,
        position: 'absolute',
        borderRadius: 18,
        transform: [
          {translateX: translateX},
          {translateY: translateY},
          {scaleX: scaleX},
          {scaleY: scaleY},
        ],
        alignItems: 'center' }}>
        <Text style={{color: 'white', fontSize: 30}} >Menu</Text>
      </Animated.View>
    )
  }
}


