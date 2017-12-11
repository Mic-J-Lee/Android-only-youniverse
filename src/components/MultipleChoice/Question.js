import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import AudioButton from './AudioButton'
import PictureButton from './PictureButton'
import { _loadSoundObject } from './helpers'

export default class Question extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY()
  }

  componentDidUpdate(prevProps) {
    this.props.status == 'animating' && setTimeout(()=>this.exitScreenInTriumph(), 500)
    this.props.status == 'ready' && prevProps.status == 'animating' && this.enterScreen(()=>{this.animatedValue.setValue({ x: 0, y: 0})})
    this.props.activeColor != prevProps.activeColor && this.enterScreen()
  }

  enterScreen() {
    this.animatedValue.setValue({ x: 0, y: -500})
    Animated.spring(
      this.animatedValue,
      { 
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
        duration: 500,
      }
    ).start()
  }

  exitScreenInTriumph() {
    this.animatedValue.setValue({ x: 0, y: 0})
    Animated.timing(
      this.animatedValue,
      { 
       toValue: {x: -500, y: 0},
       useNativeDriver: true,
       duration: 300,
       easing: Easing.cubic
      }
    ).start(()=>this.props._readyToSwitch())
  }

  render() {
    const content = this.props.content
    const audioButton = (
      <Animated.View style={{transform: this.animatedValue.getTranslateTransform()}} >
        <AudioButton 
          sound={content} 
          size='large' 
          soundObject={_loadSoundObject(content)} />
      </Animated.View>
    )
    const pictureButton = (
      <Animated.View style={{transform: this.animatedValue.getTranslateTransform()}} >
        <PictureButton 
          picture={content} 
          size='large' />
      </Animated.View>
    )

    return (
      this.props.type == 'audio' ? audioButton : pictureButton
    )
  }
}
