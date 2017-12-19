import React, { Component } from 'react'
import { Animated, Easing, Dimensions, PanResponder, TouchableWithoutFeedback, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'

export default class Ivan extends Component {
  constructor() {
    super()
    this.state = ({
      flyingAround: false,
      wingsInvisible: false,
      roomForExpansion: false,
      cantPressMe: false
    })
  }

  componentWillMount() {
    this.ivanStartingPosition = {x: 20, y : 80}
    this.ivanFlap = new Animated.Value(0)
    this.ivanBurger = new Animated.Value(1)
    this.ivanPosition = new Animated.ValueXY({x: 20, y : 80})
    this._ivanPositionValue = {x: 20, y: 80}
    this.ivanPosition.addListener((value) => this._ivanPositionValue = value)
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx != 0 && gestureState.dy != 0 && !this.state.roomForExpansion,
      onPanResponderGrant: (e, gestureState) => {
        this.ivanPosition.setOffset({
          x: this._ivanPositionValue.x,
          y: this._ivanPositionValue.y,
        })
        this.ivanPosition.setValue({ x: 0, y: 0})
        this.setState({flyingAround: true})
        setTimeout(()=>this._flap(), 0)
        this.getBackHere = setInterval(()=>this._stayOnScreen(), 1)
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.ivanPosition.x, dy: this.ivanPosition.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.ivanPosition.flattenOffset()
        Animated.decay(this.ivanPosition, {
          useNativeDriver: true,
          deceleration: 0.996,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start(()=>{
          this.setState({flyingAround: false})
          clearInterval(this.getBackHere)
          this._float()
        })
      },
    })
    this._flap()
    this._float()
  }

  componentDidUpdate() {
    !this.state.roomForExpansion && this._stayOnScreen()
  }

  _toggleSettings() {
    this.setState({cantPressMe:true})
    if (this.state.wingsInvisible) this._deactivateSettings()
    else this._activateSettings()
    setTimeout(()=>this.setState({cantPressMe:false}), 1500)
  }

  _activateSettings() {
    this.props._pause()
    this.setState({roomForExpansion:true})
    this.ivanPosition.setOffset({x: -15, y: -15})
    setTimeout(()=>this.setState({wingsInvisible:true}), 280)
    this.ivanPositionBeforeSettings = this._ivanPositionValue
    this.ivanBurger.setValue(1)
    Animated.sequence([
      Animated.timing(
        this.ivanBurger,
        {
          toValue: 7,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.elastic(1)
        }
      ),
      Animated.timing(
        this.ivanPosition,
        {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          duration: 200,
          easing:Easing.ease
        }
      )
    ]).start()
    setTimeout(()=>this.props._activateSettings(), 750)
  }

  _deactivateSettings() {
    this.props._deactivateSettings()
    this.ivanPosition.setValue({x:15,y:15})
    this.ivanPosition.flattenOffset()
    this.setState({roomForExpansion:false})
    this.setState({
      wingsInvisible: false,
      flyingAround: true
    })
    this.ivanBurger.setValue(7)
    Animated.sequence([
      Animated.spring(
        this.ivanBurger,
        {
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }
      ),
      Animated.timing(
        this.ivanPosition,
        {
          toValue: this.ivanPositionBeforeSettings,
          useNativeDriver: true,
          duration: 1000,
          easing:Easing.ease
        }
      )
    ]).start(()=>{
      this.setState({flyingAround:false})
      this._float()
    })
  }

  _stayOnScreen = () => {
    let dim = Dimensions.get('screen')
    if (this._ivanPositionValue.x < -20) this.ivanPosition.x.setValue(-20)
    if (this._ivanPositionValue.y < -20) this.ivanPosition.y.setValue(-20)
    if (this._ivanPositionValue.x > dim.width - 50) this.ivanPosition.x.setValue(dim.width - 50)
    if (this._ivanPositionValue.y > dim.height - 70) this.ivanPosition.y.setValue(dim.height - 70)
  }

  _float() {
    let startingPosition = this._ivanPositionValue.y
    Animated.sequence([
      Animated.timing(
        this.ivanPosition['y'],
        {
          toValue: startingPosition + 10,
          useNativeDriver: true,
          duration: this.state.flyingAround ? 35 : 1000,
          easing: Easing.ease,
        }
      ),
      Animated.timing(
        this.ivanPosition['y'],
        {
          toValue: startingPosition,
          useNativeDriver: true,
          duration: this.state.flyingAround ? 35 : 1000,
          easing: Easing.ease,
        }
      )
    ]).start((o) => {
      if (o.finished) {      
        this._float()
      }
    })
  }

  _flap() {
    this.ivanFlap.setValue(0)
    Animated.sequence([
      Animated.timing(
        this.ivanFlap,
        {
          toValue: 1,
          duration: this.state.flyingAround ? 35 : 1000,
          easing: Easing.ease,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.ivanFlap,
        {
          toValue: 0,
          duration: this.state.flyingAround ? 35 : 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ]).start((o) => {
      if (o.finished) {      
        this._flap()
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
    const wingY = this.ivanFlap.interpolate({
      inputRange: [0, 1],
      outputRange: [-12, -16]
    })

    return (
      <Animated.View style={{
        height: this.state.roomForExpansion ? 100 : 70, 
        width: this.state.roomForExpansion ? 100 : 70, 
        position:'absolute', 
        transform: this.ivanPosition.getTranslateTransform(), 
        alignItems: 'center', 
        justifyContent: 'center'
      }} {...this.panResponder.panHandlers} >
        <TouchableWithoutFeedback 
          onPress={this._toggleSettings.bind(this)} 
          disabled={this.state.cantPressMe} >
          <View style={{
            height: this.state.roomForExpansion ? 100 : 70, 
            width: this.state.roomForExpansion ? 100 : 70, 
            alignItems: 'center', 
            justifyContent: 'center'
          }} >
            <Animated.Image 
              source={Images.ivans_right_wing} 
              style={{
                height: 40,
                width: 40,
                position:'absolute', 
                transform: [
                  {rotate: .1},
                  {translateX: -13}, 
                  {translateY: wingY}, 
                  {rotateX: zeroToSixty}, 
                  {rotateY: zeroToSixty}
                ],
                opacity: this.state.wingsInvisible ? 0 : 1
              }} 
              resizeMode='contain' />
            <Animated.Image 
              source={Images.ivans_left_wing} 
              style={{
                height: 40,
                width: 40,
                position:'absolute', 
                transform: [
                  {rotate: -.1},
                  {translateX: 13}, 
                  {translateY: wingY}, 
                  {rotateX: zeroToNegativeSixty}, 
                  {rotateY: zeroToSixty}
                ],
                opacity: this.state.wingsInvisible ? 0 : 1
              }} 
              resizeMode='contain' />
            <Animated.Image 
              source={Images.ivans_right_foot} 
              style={{
                height: 20,
                width: 20,
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
                height: 20,
                width: 20,
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
                height: 30,
                width: 30,
                position:'absolute'
              }} 
              resizeMode='contain' />
            <Animated.Image 
              source={Images.settings_burger} 
              style={{
                height: 10,
                width: 10,
                position:'absolute',
                transform: [{scale: this.ivanBurger}]
              }} 
              resizeMode='contain' />
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
}


