import React, { Component } from 'react'
import { Animated, Easing, View } from 'react-native'
import AudioButton from './AudioButton'
import PictureButton from './PictureButton'
import Choice from './Choice'
import { _animateQuestionCompletion, _displayMultipleChoices, _loadSoundObject, modes } from './helpers'
import { styles } from './styleModule'

export default class MultipleChoiceQuestion extends Component {
  constructor() {
    super()
    this.getInFormation = () => {
      this.answer1 = new Animated.Value(0)
      this.answer2 = new Animated.Value(0)
      this.answer3 = new Animated.Value(0)
      this.answer4 = new Animated.Value(0)
      this.answer5 = new Animated.Value(0)
      this.answer6 = new Animated.Value(0)
      this.correctGo = new Animated.Value(0)
      this.questionGo = new Animated.Value(0)
      this.correctCome = new Animated.Value(0)
      this.questionCome = new Animated.Value(0)
    }
    this.getInFormation()
    this.verticalAnimationValues = [this.answer1, this.answer2, this.answer3, this.answer4, this.answer5, this.answer6, this.correctCome, this.questionCome]
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.activeColor != this.props.activeColor) {
      for (value of this.verticalAnimationValues) {
        value.setValue(-500)
      }
      this.correctGo.setValue(0)
      this.questionGo.setValue(0)
    } else {
      this.getInFormation()
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.activeColor != this.props.activeColor) {
      animations = []
      for (value of this.verticalAnimationValues) {
        animations.push(Animated.timing(
          value,
          { 
            toValue: 0,
            useNativeDriver: true,
            duration: 500,
            easing: Easing.elastic(1),
          }
        ))
      }
      Animated.parallel(animations).start()
    }
  }

  getQuestion = () => {
    const type = modes[this.props.activeColor]['question']
    const content = this.props.cards[0][type]
    if (type == 'audio') 
      return (
        <Animated.View 
          style={{ transform: [{translateX: this.questionGo}, {translateY: this.questionCome}] }}>
          <AudioButton 
            sound={content} 
            size='large' 
            soundObject={_loadSoundObject(content)} />
        </Animated.View>
      )
    return (
      <Animated.View 
        style={{ transform: [{translateX: this.questionGo}, {translateY: this.questionCome}] }}>
        <PictureButton 
          picture={content} 
          size='large' />
      </Animated.View>
    )
  }
  
  getchoices = () => {
    const type = modes[this.props.activeColor]['answers']
    const correct = this.props.cards[0][type]
    let choices = []
    this.props.cards.forEach(function(card){choices.push(card[type])})
    output = []
    const animationValues = [this.answer1, this.answer2, this.answer3, this.answer4, this.answer5, this.answer6]
    for (let i = 0; i < choices.length; i++) {
      output.push(
        <Animated.View 
          style={{ transform: choices[i] == correct ? 
            [{translateX: this.correctGo}, {translateY: this.correctCome}] : 
            [{translateY: animationValues[i]}] }}>
          <Choice 
            type={type} 
            content={choices[i]}
            isCorrect={choices[i] == correct} 
            _nextColor={this.success} />
        </Animated.View>
      )
    }
    return output
  }

  success = () => {
    const choiceAnimationValues = [this.answer1, this.answer2, this.answer3, this.answer4, this.answer5, this.answer6]
    _animateQuestionCompletion(choiceAnimationValues, this.questionGo, this.correctGo)
    setTimeout(() => this.props._nextColor(), 580)
  }

  render() {
    const choices = this.getchoices()
    const question = this.getQuestion()
    const isPortrait = this.props.orientation == 'portrait'

    function _displayQuestion(question) {
      return (
        <View style={isPortrait ? styles.portraitQuestion : styles.landscapeQuestion}>
          {question}
        </View>
      )
    }

    return (
      <View style={{flex: 12, flexDirection: isPortrait ? 'column' : 'row'}} >
        <View style={{flex: 11, flexDirection: isPortrait ? 'column' : 'row'}}>
          {_displayQuestion(question)}
          {_displayMultipleChoices(choices, isPortrait)}
        </View>
        <View style={[{flex: 1}]} />
      </View>
    )
  }
}


