import React, { Component } from 'react'
import { Animated, Easing, Dimensions, PanResponder, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'

export default class Cloud extends Component {
  constructor() {
    super()
    this.state = {
      travelTime: Math.random() * (100000 - 10000) + 10000
    }
  }

  componentWillMount() {
    this.cloudStartingPosition = {x: 650, y: Dimensions.get('screen').height * Math.random() - 100}
    this.animatedValue = new Animated.ValueXY(this.cloudStartingPosition);
    this._value = {x: 0, y: 0}
    this.animatedValue.addListener((value) => this._value = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.setState({travelTime: Math.abs(this.state.travelTime / 2)})
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })
        this.animatedValue.setValue({x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.animatedValue.x, dy: this.animatedValue.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          useNativeDriver: true,
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start(() => this._float(this.state.travelTime));
      },
    })
    this._float()
  }

  _float(duration) {
    Animated.timing(
      this.animatedValue['x'],
      {
        toValue: -600,
        useNativeDriver: true,
        duration: duration || this.state.travelTime,
        easing: Easing.linear,
      }
    ).start((o) => {
      if (o.finished) {
        this.setState({travelTime: Math.random() * (100000 - 10000) + 10000})
        this.animatedValue.setValue(this.cloudStartingPosition)
        this._float()
      }
    })
  }


  render() {

    return (
      <Animated.Image {...this.panResponder.panHandlers}
        source={Images[this.props.image]} 
        style={{
          height:this.props.size,
          width:260,
          position:'absolute', 
          transform: this.animatedValue.getTranslateTransform()
        }} 
        resizeMode='contain' />
    )
  }
}


