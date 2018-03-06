import React, { Component } from 'react'
import { Animated, Easing, Dimensions, PanResponder, TouchableWithoutFeedback, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'
import SpeechBubble from './SpeechBubble'

export default class Ivan extends Component {
  constructor() {
    super()
    this.state = ({
      flyingAround: false,
      wingsInvisible: false,
      roomForExpansion: false,
      cantPressMe: false,
      ivanSays: false
    })
  }

  componentWillMount() {
    this.ivanStartingPosition = {x: 20, y : 80}
    this.ivanFlap = new Animated.Value(0)
    this.burgerSize = new Animated.Value(1)
    this.ivanPosition = new Animated.ValueXY({x: 20, y : 80})
    this.ivanPositionValue = {x: 20, y: 80}
    this.ivanPosition.addListener((value) => this.ivanPositionValue = value)
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx != 0 && gestureState.dy != 0 && !this.state.roomForExpansion,
      onPanResponderGrant: (e, gestureState) => {
        this.ivanPosition.setOffset({
          x: this.ivanPositionValue.x,
          y: this.ivanPositionValue.y,
        })
        this.ivanPosition.setValue({ x: 0, y: 0})
        this.setState({flyingAround: true})
        setTimeout(()=>this._flap(), 0)
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.ivanPosition.x, dy: this.ivanPosition.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.getBackHere = setInterval(()=>this._stayOnScreen(), 1)
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

  _toggleMenu() {
    this.setState({cantPressMe:true})
    if (this.state.wingsInvisible) this._exitMenu()
    else this._enterMenu()
    setTimeout(()=>this.setState({cantPressMe:false}), 1500)
  }

  _enterMenu() {
    this.props._pause()
    this.setState({roomForExpansion:true})
    this.ivanPosition.setOffset({x: -15, y: -15})
    setTimeout(()=>this.setState({wingsInvisible:true}), 280)
    this.ivanPositionBeforeMenu = this.ivanPositionValue
    this.burgerSize.setValue(1)
    Animated.sequence([
      Animated.timing(
        this.burgerSize,
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
    setTimeout(()=>this.props._enterMenu(), 750)
  }

  _exitMenu() {
    this.props._exitMenu()
    this.ivanPosition.setValue({x:15,y:15})
    this.ivanPosition.flattenOffset()
    this.setState({roomForExpansion:false})
    this.setState({
      wingsInvisible: false,
      flyingAround: true
    })
    setTimeout(()=>this._flap(), 0)
    this.burgerSize.setValue(7)
    Animated.stagger(200, [
      Animated.spring(
        this.burgerSize,
        {
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }
      ),
      Animated.timing(
        this.ivanPosition,
        {
          toValue: this.ivanPositionBeforeMenu,
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
    if (this.ivanPositionValue.x < -20) this.ivanPosition.x.setValue(-20)
    if (this.ivanPositionValue.y < -20) this.ivanPosition.y.setValue(-20)
    if (this.ivanPositionValue.x > dim.width - 50) this.ivanPosition.x.setValue(dim.width - 50)
    if (this.ivanPositionValue.y > dim.height - 70) this.ivanPosition.y.setValue(dim.height - 70)
  }

  _float() {
    let startingPosition = this.ivanPositionValue.y
    Animated.sequence([
      Animated.timing(
        this.ivanPosition['y'],
        {
          toValue: startingPosition + 10,
          useNativeDriver: true,
          duration: 1000,
          easing: Easing.ease,
        }
      ),
      Animated.timing(
        this.ivanPosition['y'],
        {
          toValue: startingPosition,
          useNativeDriver: true,
          duration: 1000,
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
          duration: this.state.flyingAround ? 45 : 1000,
          easing: Easing.ease,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.ivanFlap,
        {
          toValue: 0,
          duration: this.state.flyingAround ? 45 : 1000,
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

  _speechBubbleDimensions(layout){
    const {x, y, width, height} = layout;
    this._bubbleSize = {
      x: x,
      y: y,
      width: width,
      height: height
    }
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
      outputRange: [-8, -14]
    })
    const bodyPart = (imageSource, height, width, rotate, translateX, translateY, rotateX, rotateY) => {
      return (
        <Animated.Image
          source={Images[imageSource]} 
          style={{
            height: height,
            width: width,
            position:'absolute', 
            transform: [
              {rotate: rotate},
              {translateX: translateX}, 
              {translateY: translateY}, 
              {rotateX: rotateX}, 
              {rotateY: rotateY}
            ],
            opacity: this.state.wingsInvisible ? 0 : 1
          }} 
          resizeMode='contain' />
      )
    }
    const viewSize = this.state.roomForExpansion ? 100 : 70
    let dim = Dimensions.get('screen')
    let realm = this.props.realm
    realm && (this.state.ivanSays = realm.objects('Game')[0].introStatus)
    return (
      <View style={{height: dim.height, width: dim.width, position: 'absolute'}} >
        <Animated.View
          style={{
            transform: this.ivanPosition.getTranslateTransform(),
            alignSelf: 'flex-start',
            bottom: this.ivanPositionValue.y < dim.height/2 - 40 ? null : this._bubbleSize.height,
            top: this.ivanPositionValue.y < dim.height/2 - 40 ? 50 : null,
            left: this.ivanPositionValue.x < dim.width/2 - 35 ? null : 20 - this._bubbleSize.width,
            right: this.ivanPositionValue.x < dim.width/2 - 35 ? -45 : null,
          }}
          onLayout={(event) => {
            this._speechBubbleDimensions(event.nativeEvent.layout)
          }}>
          {this.state.ivanSays && <SpeechBubble width={dim.width} ivanSays={this.state.ivanSays} />}
        </Animated.View>
        <Animated.View style={{
          height: viewSize,
          width: viewSize,
          transform: this.ivanPosition.getTranslateTransform(),
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute'
          }} {...this.panResponder.panHandlers} >
          <TouchableWithoutFeedback
            onPress={this._toggleMenu.bind(this)}
            disabled={this.state.cantPressMe} >
            <View style={{
              height: viewSize,
              width: viewSize,
              alignItems: 'center',
              justifyContent: 'center',
              }} >
              {bodyPart('ivans_right_wing', 38, 38, .1, -9, wingY, zeroToSixty, zeroToSixty)}
              {bodyPart('ivans_left_wing', 38, 38, -.1, 9, wingY, zeroToNegativeSixty, zeroToSixty)}
              {bodyPart('ivans_right_foot', 20, 15, 0, -6, 5, zeroToSixty, zeroToNegativeSixty)}
              {bodyPart('ivans_left_foot', 20, 15, 0, 6, 5, zeroToNegativeSixty, zeroToNegativeSixty)}
              {bodyPart('ivans_body', 28, 28, '0deg', 0, 0, '0deg', '0deg')}
              <Animated.Image
                source={Images.menu_burger}
                style={{
                  height: 10,
                  width: 10,
                  position:'absolute',
                  transform: [{scale: this.burgerSize}] }}
                resizeMode='contain' />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    )
  }
}


