import React, { Component } from 'react'
import { Animated, Easing, Dimensions, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'

export default class Cloud extends Component {
  constructor() {
    super()
    this.translateX = new Animated.Value(600)
    this.translateY = new Animated.Value(200)
  }

  componentDidMount() {
    this.float()
  }

  float() {
    this.translateY.setValue(Dimensions.get('screen').height * Math.random() - 100)
    this.translateX.setValue(600)
    Animated.timing(
      this.translateX,
      {
        toValue: -650,
        useNativeDriver: true,
        duration: Math.random() * (100000 - 10000) + 10000,
        easing: Easing.ease
      }
    ).start(() => this.float())
  }


  render() {
    
    return (
      <Animated.Image source={Images[this.props.image]} style={{height:this.props.size, position:'absolute', transform: [{translateX: this.translateX}, {translateY: this.translateY}] }} resizeMode='contain' />
    )
  }
}


