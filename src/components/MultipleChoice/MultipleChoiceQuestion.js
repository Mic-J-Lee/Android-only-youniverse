import React, { Component } from 'react'
import { View } from 'react-native'
import AudioButton from './AudioButton'
import PictureButton from './PictureButton'
import Choice from './Choice'
import { _displayLandscapeMultipleChoices, _displayLandscapeQuestion, _displayMultipleChoices, _displayQuestion, _loadSoundObject, modes } from './helpers'

export default class MultipleChoiceQuestion extends Component {

  getQuestion = () => {
    const type = modes[this.props.mode]['question']
    const content = this.props.cards[0][type]
    if (type == 'audio') 
      return (<AudioButton sound={content} size='large' soundObject={_loadSoundObject(content)} />)
    else
      return (<PictureButton picture={content} size='large' />)
  }
  
  getchoices = () => {
    const type = modes[this.props.mode]['answers']
    const correct = this.props.cards[0][type]
    let choices = []
    this.props.cards.forEach(function(card){choices.push(card[type])})
    output = []
    for (content of choices) {
      output.push(<Choice 
        type={type} 
        content={content}
        isCorrect={content == correct} 
        _nextColor={this.props._nextColor} />)
    }
    return output
  }

  render() {
    const choices = this.getchoices()
    const question = this.getQuestion()
    const portrait = this.props.orientation == 'portrait'

    return (
      <View style={{flex: 1, flexDirection: portrait ? 'column' : 'row'}}>
        {portrait ? _displayQuestion(question) : _displayLandscapeQuestion(question)}
        {portrait ? _displayMultipleChoices(choices) : _displayLandscapeMultipleChoices(choices)}
      </View>
    )
  }
}


