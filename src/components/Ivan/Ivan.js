import React, { Component } from 'react'
import { Animated, Easing, Dimensions, PanResponder, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'

export default class Ivan extends Component {
  componentWillMount() {
    this.ivanStartingPosition = {x: 20, y : 80}
    this.ivanRightWing = new Animated.Value()
    this.position = new Animated.ValueXY({x: 20, y : 80})
    this._value = {x: 0, y: 0}
    this.position.addListener((value) => this._value = value)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.position.setOffset({
          x: this._value.x,
          y: this._value.y,
        })
        this.position.setValue({ x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.position.x, dy: this.position.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.position.flattenOffset()
        Animated.decay(this.position, {
          useNativeDriver: true,
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start(()=>this.float())
      },
    })
    
  }

  float() {
    Animated.timing(
      this.position['x'],
      {
        toValue: -600,
        useNativeDriver: true,
        duration: 100000,
        easing: Easing.linear,
      }
    ).start((o) => {
      if (o.finished) {      
        this.position.setValue({x:0, y:0})
        this.float()
      }
    })
  }

  flap() {
    Animated.timing(


    )
  }


  render() {

    return (
      <Animated.View style={{height: 60, width: 100, position:'absolute', transform: this.position.getTranslateTransform(), alignItems: 'center', justifyContent: 'center'}} {...this.panResponder.panHandlers} >
        <Animated.Image 
          source={Images.ivans_right_wing} 
          style={{
            height:40,
            width:40,
            position:'absolute', 
            transform: [{translateX: -15}, {translateY: -12}] 
          }} 
          resizeMode='contain' />
        <Animated.Image 
          source={Images.ivans_left_wing} 
          style={{
            height:40,
            width:40,
            position:'absolute', 
            transform: [{translateX: 15}, {translateY: -12}] 
          }} 
          resizeMode='contain' />
        <Animated.Image 
          source={Images.ivans_right_foot} 
          style={{
            height:20,
            width:20,
            position:'absolute', 
            transform: [{translateX: -8}, {translateY: 10}] 
          }} 
          resizeMode='contain' />
        <Animated.Image 
          source={Images.ivans_left_foot} 
          style={{
            height:20,
            width:20,
            position:'absolute', 
            transform: [{translateX: 8}, {translateY: 10}] 
          }} 
          resizeMode='contain' />
        <Animated.Image 
          source={Images.ivans_body} 
          style={{
            height:30,
            width:30,
            position:'absolute'
          }} 
          resizeMode='contain' />

      </Animated.View>
    )
  }
}


