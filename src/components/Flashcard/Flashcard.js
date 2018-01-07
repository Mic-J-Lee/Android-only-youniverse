import React, { Component } from 'react'
import { Animated, Easing, View } from 'react-native'
import Choice from './Choice'
import Question from './Question'
import { _displayMultipleChoices, modes } from './helpers'
import Sound from 'react-native-sound'
import Images from '../../assets/pictures/dynamicRequire'
import { styles } from './styleModule'

export default class Flashcard extends Component {
  constructor() {
    super()
    this.state = {
      status: 'ready',
      wrongGuesses: [],
      cards: initialCards,
      correctCard: initialCards[Math.floor(Math.random()*initialCards.length)],
    }
  }

  componentWillMount(){

  }

  componentWillReceiveProps(newProps){
    if (newProps.activeColor != this.props.activeColor
      && this.state.status == 'ready') this._drawSixCards()
    if (newProps.status == 'paused') this.setState({status:'paused'})
    else this.setState({status: 'ready'})
  }

  componentWillUpdate(nextState) {
    if (nextState.status == 'ready' && this.state.status == 'animating success') this._drawSixCards()
  }

  _success = () => {
    this.setState({status: 'starting success animation'})
    setTimeout(()=>this.setState({status: 'animating success'}), 0)
  }

  _drawSixCards = () => {
    //access database, obtain one correct card and five dummies
    shuffledCards = initialCards.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1])
    for (card of shuffledCards) {
      for (format in card) {
        switch (format) {
          case 'audio':
            card.audioFile = new Sound('cantonese' + '_' + card.audio + '.mp3', Sound.MAIN_BUNDLE)
            break
          case 'picture':
            card.pictureFile = Images[card.picture]
            break
          case 'writing':
            card.writingFile = Images[card.writing]
        }
      }
    }  
    this.setState({
      cards: shuffledCards,
      correctCard: shuffledCards[Math.floor(Math.random()*shuffledCards.length)],
      wrongGuesses: []
    })
  }

  _getQuestion = () => {
    const type = modes[this.props.activeColor]['question']
    const content = this.state.correctCard[type]
    const file = this.state.correctCard[type + 'File']
    return (<Question 
      type={type}
      content={content} 
      file={file}
      status={this.state.status}
      activeColor={this.props.activeColor}
      _readyToSwitch={this.props._nextColor} />
    )
  }
  
  _loadCardData = (cards = [...this.state.cards]) => {

  }

  _getchoices = () => {
    const type = modes[this.props.activeColor]['answers']
    const correct = this.state.correctCard[type]
    let choices = []
    this.state.cards.forEach(function(card){
      choices.push([card[type], card[type + 'File']])
    })
    let output = []
    for (let i = 0; i < choices.length; i++) {
      let isCorrect = choices[i][0] == correct
      output.push(<Choice
        key={choices[i]} 
        status={this.state.status}
        type={type} 
        content={choices[i][0]}
        file={choices[i][1]}
        isCorrect={isCorrect} 
        _nextColor={this._success}
        _wrongGuess={this._wrongGuess}
        wrongGuesses={this.state.wrongGuesses}
        activeColor={this.props.activeColor} />
      )
    }
    return output
  }

  _wrongGuess = (guess) => {
    let wrongGuessesClone = [...this.state.wrongGuesses]
    wrongGuessesClone.push(guess)
    this.setState({wrongGuesses: wrongGuessesClone})
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
        <View style={{flex: 1}} />
      </View>
    )
  }
}

const initialCards = [
  {
    audio: 'jat1',
    picture: 'english1',
    writing: 'chinese1'
  },
  {
    audio: 'ji6',
    picture: 'english2',
    writing: 'chinese2'
  },
  {
    audio: 'saam1',
    picture: 'english3',
    writing: 'chinese3'
  },
  {
    audio: 'sei3',
    picture: 'english4',
    writing: 'chinese4'
  },
  {
    audio: 'ng5',
    picture: 'english5',
    writing: 'chinese5'
  },
  {
    audio: 'luk6',
    picture: 'english6',
    writing: 'chinese6'
  }
]
