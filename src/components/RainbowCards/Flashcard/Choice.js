import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import AudioButton from './AudioButton'
import PictureButton from './PictureButton'
import { _loadSoundObject } from './helpers'

export default class Choice extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY()
  }

  componentDidMount() {
    this._enterScreen()
  }

  componentDidUpdate(prevProps) {
    const p = this.props
    this.props.status == 'starting success animation' 
      && this.props.isCorrect 
        && setTimeout(()=>this._exitScreenInTriumph(), 750)
    this.props.status == 'starting success animation' 
      && !this.props.isCorrect 
        && setTimeout(()=>this._exitScreenInDespair(), Math.random() * 300)
    prevProps.status == 'animating success' 
      && this.props.status == 'ready' && this._enterScreen()
    this.props.activeColor != prevProps.activeColor && this._enterScreen()
  }

  _enterScreen() {
    this.animatedValue.setValue({ x: 0, y: -500})
    Animated.spring(
      this.animatedValue,
      { 
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
        duration: 500,
      }
    ).start(()=>{this.animatedValue.setValue({ x: 0, y: 0})})
  }

  _exitScreenInTriumph() {
    this.animatedValue.setValue({ x: 0, y: 0})
    Animated.timing(
      this.animatedValue,
      { 
       toValue: {x: -600, y: 0},
       useNativeDriver: true,
       duration: 500,
       easing: Easing.cubic
      }
    ).start()
  }

  _exitScreenInDespair() {
    this.animatedValue.setValue({ x: 0, y: 0})
    Animated.timing(
      this.animatedValue,
      { 
       toValue: {x: 0, y: 400},
       useNativeDriver: true,
       duration: 500,
       easing: Easing.poly(5)
      }
    ).start()
  }

  _checkIfCorrect = () => {
    if (this.props.status == 'ready') {
      if (this.props.isCorrect) this.props._nextColor()
      else this.props._wrongGuess(this.props.content)
    }
  }

  render() {
    const p = this.props
    const content = p.content
    const audioButton = (
      <Animated.View style={{transform: this.animatedValue.getTranslateTransform()}} >
        <AudioButton 
          sound={content}
          size='small'
          isCorrect={p.isCorrect}
          _checkIfCorrect={this._checkIfCorrect}
          disabled={p.wrongGuesses.includes(content)} />
      </Animated.View>
    )
    const pictureButton = (
      <Animated.View style={{transform: this.animatedValue.getTranslateTransform()}} >
        <PictureButton
          status={p.status}
          picture={content}
          size='small'
          isCorrect={p.isCorrect}
          _checkIfCorrect={this._checkIfCorrect}
          disabled={p.wrongGuesses.includes(content)} />
      </Animated.View>
    )

    return (
      p.medium == 'audio' ? audioButton : pictureButton
    )
  }
}
