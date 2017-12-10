import React, { Component } from 'react'
import { Animated, Image, TouchableOpacity } from 'react-native'
import AudioButton from './AudioButton'
import PictureButton from './PictureButton'
import { _loadSoundObject } from './helpers'


export default class Choice extends Component {
  constructor() {
    super()
    this.springValue = new Animated.Value(60)
    this.state = {
      wrongGuess: false
    }
  }
  
  _checkIfCorrect = () => {
    if (this.props.isCorrect) {
      this.props._nextColor()
    } else {
      this.setState({
        wrongGuess: true
      })
    }
    
  }

  render() {
    const content = this.props.content

    const audioButton = (<AudioButton 
      sound={content} 
      size='small' 
      soundObject={_loadSoundObject(content)} 
      isCorrect={this.props.isCorrect} 
      _checkIfCorrect={this._checkIfCorrect}
      disabled={this.state.wrongGuess} />)

    const pictureButton = (<PictureButton 
      picture={content}
      size='small' 
      isCorrect={this.props.isCorrect} 
      _checkIfCorrect={this._checkIfCorrect}
      disabled={this.state.wrongGuess} />) 

    return (
      this.props.type == 'audio' ? audioButton : pictureButton
    )
  }
}
