import React, { Component } from 'react'
import { Animated, Dimensions, PanResponder, Text, TouchableWithoutFeedback, View } from 'react-native'

export default class Settings extends Component {
  componentWillMount() {
    this.stretchSideways = new Animated.Value(0)
    this.expandDown = new Animated.Value(0)
  }

  componentDidMount() {
    this._enter()
  }

  componentWillReceiveProps(newProps) {
    newProps.settings == 'leaving' && this._leave()
  }

  _enter() {
    this.stretchSideways.setValue(0)
    this.expandDown.setValue(0)
    Animated.sequence([
      Animated.timing(
        this.stretchSideways,
        {
          toValue: 1,
          useNativeDriver: true,
          duration: 200
        }
      ),
      Animated.timing(
        this.expandDown,
        {
          toValue: 1,
          useNativeDriver: true,
          duration: 100
        }
      )
    ]).start()
  }

  _leave() {
    Animated.sequence([
      Animated.timing(
        this.expandDown,
        {
          toValue: 0,
          useNativeDriver: true,
          duration: 50
        }
      ),
      Animated.timing(
        this.stretchSideways,
        {
          toValue: 0,
          useNativeDriver: true,
          duration: 100
        }
      )
    ]).start(()=>{
      this.props._deactivateSettings()
      this.props._unpause()
    })
  }

  render() {
    let dim = Dimensions.get('screen')
    const translateX = this.stretchSideways.interpolate({
      inputRange: [0, 1],
      outputRange: [-dim.height/2.35, 5]
    })
    const translateY = this.expandDown.interpolate({
      inputRange: [0, 1],
      outputRange: [-dim.height/2.35, 5]
    })
    const scaleX = this.stretchSideways.interpolate({
      inputRange: [0, 1],
      outputRange: [.01, 1]
    })
    const scaleY = this.expandDown.interpolate({
      inputRange: [0, 1],
      outputRange: [.01, 1]
    })

    return (
      <Animated.View style={{
        height: dim.height - 30, 
        width: dim.width - 10,
        backgroundColor: 'black',
        opacity: .90,
        position: 'absolute',
        borderRadius: 10,
        transform: [
          {translateX: translateX},
          {translateY: translateY},
          {scaleX: scaleX},
          {scaleY: scaleY},
        ],
        alignItems: 'center'
      }}>
        <Text style={{color: 'white', fontSize: 30}} >Settings</Text>

      </Animated.View>
    )
  }
}


