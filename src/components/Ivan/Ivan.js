import React, { Component } from 'react'
import { Animated, Easing, Dimensions, PanResponder, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'

export default class Ivan extends Component {
  constructor() {
    super()
    this.state = ({
      flyingAround: false
    })
  }

  componentWillMount() {
    this.ivanStartingPosition = {x: 20, y : 80}
    this.ivanFlap = new Animated.Value(0)
    this.position = new Animated.ValueXY({x: 20, y : 80})
    this._value = {x: 20, y: 80}
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
        this.setState({flyingAround: true})
        setTimeout(()=>this.flap(), 100)
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.position.x, dy: this.position.y}
      ])
      ,
      onPanResponderRelease: (e, gestureState) => {
        this.position.flattenOffset()
        Animated.decay(this.position, {
          useNativeDriver: true,
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start(()=>{
          this.setState({flyingAround: false})
          this.float()
        })
      },
    })
    this.flap()
    this.float()
  }

  float() {
    let startingPosition = this._value.y
    Animated.sequence([
      Animated.timing(
        this.position['y'],
        {
          toValue: startingPosition + 10,
          useNativeDriver: true,
          duration: this.state.flyingAround ? 20 : 1000,
          easing: Easing.ease,
        }
      ),
      Animated.timing(
        this.position['y'],
        {
          toValue: startingPosition,
          useNativeDriver: true,
          duration: this.state.flyingAround ? 20 : 1000,
          easing: Easing.ease,
        }
      )
    ]).start((o) => {
      if (o.finished) {      
        this.float()
      }
    })
  }

  flap() {
    this.ivanFlap.setValue(0)
    Animated.sequence([
      Animated.timing(
        this.ivanFlap,
        {
          toValue: 1,
          duration: this.state.flyingAround ? 20 : 1000,
          easing: Easing.ease,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.ivanFlap,
        {
          toValue: 0,
          duration: this.state.flyingAround ? 20 : 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ]).start((o) => {
      if (o.finished) {      
        this.flap()
      }
    })
  }


  render() {
    const zeroToSixty = this.ivanFlap.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '60deg']
      })
    const zeroToNegativeSixty = this.ivanFlap.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-60deg']
      })

    return (
      <Animated.View style={{height: 80, width: 80, position:'absolute', transform: this.position.getTranslateTransform(), alignItems: 'center', justifyContent: 'center'}} {...this.panResponder.panHandlers} >
        <Animated.Image 
          source={Images.ivans_right_wing} 
          style={{
            height:40,
            width:40,
            position:'absolute', 
            transform: [
              {rotate: .1},
              {translateX: -13}, 
              {translateY: -15}, 
              {rotateX: zeroToSixty}, 
              {rotateY: zeroToSixty}
            ] 
          }} 
          resizeMode='contain' />
        <Animated.Image 
          source={Images.ivans_left_wing} 
          style={{
            height:40,
            width:40,
            position:'absolute', 
            transform: [
              {rotate: -.1},
              {translateX: 13}, 
              {translateY: -15}, 
              {rotateX: zeroToNegativeSixty}, 
              {rotateY: zeroToSixty}
            ] 
          }} 
          resizeMode='contain' />
        <Animated.Image 
          source={Images.ivans_right_foot} 
          style={{
            height:20,
            width:20,
            position:'absolute', 
            transform: [
              {translateX: -8}, 
              {translateY: 10},
              {rotateX: zeroToSixty}, 
              {rotateY: zeroToNegativeSixty}              
            ] 
          }} 
          resizeMode='contain' />
        <Animated.Image 
          source={Images.ivans_left_foot} 
          style={{
            height:20,
            width:20,
            position:'absolute', 
            transform: [
              {translateX: 8}, 
              {translateY: 10},
              {rotateX: zeroToNegativeSixty},
              {rotateY: zeroToNegativeSixty}              
            ] 
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


