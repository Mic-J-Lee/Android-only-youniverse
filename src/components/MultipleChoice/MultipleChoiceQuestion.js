import React, { Component } from 'react'
import { Animated, Easing, View } from 'react-native'
import Choice from './Choice'
import Question from './Question'
import { _displayMultipleChoices, modes } from './helpers'
import { styles } from './styleModule'

export default class MultipleChoiceQuestion extends Component {
  constructor() {
    super()
    this.state = {
      status: 'ready'
    }
  }

  success = () => {
    this.setState({status: 'animating'})
  }

  componentWillReceiveProps(newProps){
    if (newProps.status == 'paused') this.setState({status:'paused'})
    else this.setState({status: 'ready'})
  }

  _getQuestion = () => {
    const type = modes[this.props.activeColor]['question']
    const content = this.props.correctCard[type]
    return (
        <Question 
          status={this.state.status}
          content={content} 
          activeColor={this.props.activeColor}
          type={type}
          _readyToSwitch={this.props._nextColor} />
    )
  }
  
  _getchoices = () => {
    const type = modes[this.props.activeColor]['answers']
    const correct = this.props.correctCard[type]
    let choices = []
    this.props.cards.forEach(function(card){choices.push(card[type])})
    let output = []
    for (let i = 0; i < choices.length; i++) {
      let isCorrect = choices[i] == correct
      output.push(
          <Choice
            key={choices[i]} 
            status={this.state.status}
            type={type} 
            content={choices[i]}
            isCorrect={isCorrect} 
            _nextColor={this.success}
            _wrongGuess={this.props._wrongGuess}
            wrongGuesses={this.props.wrongGuesses}
            activeColor={this.props.activeColor} />
      )
    }
    return output
  }

  render() {
    const choices = this._getchoices()
    const question = this._getQuestion()
    const isPortrait = this.props.orientation == 'portrait'

    _displayQuestion = (question) => {
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


