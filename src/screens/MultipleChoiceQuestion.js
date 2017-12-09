import React, { Component } from 'react';
import { View } from 'react-native';
import AudioButton from '../components/MultipleChoice/AudioButton';
import PictureChoice from '../components/MultipleChoice/PictureChoice';
import { _displayMultipleChoices, _displayQuestion, modes, _loadSoundObject, _shuffleThisArray } from './helpers'

export default class MultipleChoiceQuestion extends Component {

  getQuestion = () => {
    const type = modes[this.props.mode]['question']
    const correct = this.props.cards[0][type]
    switch (type) {
      case 'audio': 
        return (<AudioButton sound={correct} size='large' soundObject={_loadSoundObject(correct)} />)
        break
      case 'picture':
        return (<PictureChoice picture={correct} />)
        break
      case 'writing':
        return (<PictureChoice picture={correct} />)
    }
  }
  
  getchoices = () => {
    const type = modes[this.props.mode]['answers']
    const correct = this.props.cards[0][type]
    let choices = []
    this.props.cards.forEach(function(card){choices.push(card[type])})
    returnThisArray = []
    for (choice of choices) {
      switch (type) {
        case 'audio': 
          returnThisArray.push(<AudioButton sound={choice} size='small' soundObject={_loadSoundObject(choice)} isCorrect={choice == correct} _nextColor={this.props._nextColor} />)
          break
        case 'picture':
          returnThisArray.push(<PictureChoice picture={choice} isCorrect={choice == correct} _nextColor={this.props._nextColor} />)
          break
        case 'writing':
          returnThisArray.push(<PictureChoice picture={choice} isCorrect={choice == correct} _nextColor={this.props._nextColor} />)
      }
    }
    return returnThisArray
  }

  componentDidMount() {

  }

  render() {
    const sound = this.props.cards[0].audio
    const choices = this.getchoices()
    const question = this.getQuestion()

    return (
      <View style={{flex: 1}}>
        {_displayQuestion(question)}
        {_displayMultipleChoices(choices)}
      </View>
    );
  }
}


