import React, { Component } from 'react'
import { Alert, Animated, AppRegistry, Dimensions, Easing, LayoutAnimation, UIManager, View } from 'react-native'
import Ivan from './components/Ivan/Ivan'
import Settings from './components/Settings/Settings'
import Cloud from './components/Cloud/Cloud'
import Rainbow from './components/Rainbow/Rainbow'
import MultipleChoiceQuestion from './components/MultipleChoice/MultipleChoiceQuestion'

export default class App extends Component {
  constructor() {
    super()
    let dim = Dimensions.get('screen')
    Dimensions.addEventListener('change', () => {
      dim = Dimensions.get('screen')
      this.setState({
          orientation: dim.height > dim.width ? 'portrait' : 'landscape'
      })
    })
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    this.state = {
      orientation: dim.height > dim.width ? 'portrait' : 'landscape',
      rainbow: {
        red: true,
        orange: true,
        yellow: true,
        green: true,
        blue: true,
        purple: true
      },
      activeColor: 'red',
      cards: initialCards,
      correctCard: initialCards[Math.floor(Math.random()*initialCards.length)],
      wrongGuesses: [],
      status: 'ready',
      settings: false
    }
  }

  _drawSixCards = () => {
    //access database, obtain one correct card and five dummies
    shuffledCards = initialCards.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1])
    this.setState({
      cards: shuffledCards,
      correctCard: shuffledCards[Math.floor(Math.random()*shuffledCards.length)],
      wrongGuesses: []
    })
  }

  _toggleStripe(color) {
    let rainbowClone = {...this.state.rainbow}
    rainbowClone[color] = !rainbowClone[color]
    if (!Object.values(rainbowClone).includes(true))
      Alert.alert('You must have at least 1 active color!')
    else if (color == this.state.activeColor) {
      this._nextColor()
      this.setState({rainbow: rainbowClone})
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      this.setState({rainbow: rainbowClone})
    }
  }

  _activateStripe(color) {
    if (this.state.rainbow[color] && this.state.activeColor != color) {
      this._drawSixCards()
      this.setState({activeColor: color})
    }
  }

  _nextColor = () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    currentColor = colors.indexOf(this.state.activeColor)
    currentColor == 5 ? nextColor = 0 : nextColor = currentColor + 1
    nextColorIsFound = false
    while (nextColorIsFound == false) {
      if (this.state.rainbow[colors[nextColor]] == true) 
        nextColorIsFound = true 
      else if (nextColor == 5)
        nextColor = 0
      else
        nextColor++
    }
    // record success result into database
    this._drawSixCards()
    this.setState({activeColor: colors[nextColor]})
  }

  _wrongGuess = (guess) => {
    let wrongGuessesClone = [...this.state.wrongGuesses]
    wrongGuessesClone.push(guess)
    this.setState({wrongGuesses: wrongGuessesClone})
  }

  _pause = () => {
    this.setState({status:'paused'})
  }

  _unpause = () => {
    this.setState({status:'ready'})
  }

  _activateSettings = () => {
    this.setState({settings:'active'})
  }

  _deactivateSettings = () => {
    if (this.state.settings == 'leaving') this.setState({settings:false})
    if (this.state.settings == 'active') this.setState({settings:'leaving'})
  }

  render() {
    const clouds = (
      <View>
        <Cloud image={'cloud1'} size={120} />
        <Cloud image={'cloud2'} size={130} />
        <Cloud image={'cloud3'} size={230} />
      </View>
    )
    const rainbow = (<Rainbow 
      activeColor={this.state.activeColor} 
      rainbow={this.state.rainbow} 
      _toggleStripe={this._toggleStripe.bind(this)} 
      _activateStripe={this._activateStripe.bind(this)} 
      orientation={this.state.orientation} />
    )
    const multipleChoiceQuestion = (<MultipleChoiceQuestion
      cards={this.state.cards}
      rainbow={this.state.rainbow}
      orientation={this.state.orientation}
      correctCard={this.state.correctCard}
      activeColor={this.state.activeColor}
      _nextColor={this._nextColor}
      _wrongGuess={this._wrongGuess}
      wrongGuesses={this.state.wrongGuesses}
      status={this.state.status} />
    )
    const settings = (<Settings 
      settings={this.state.settings}
      _deactivateSettings={this._deactivateSettings}
      _unpause={this._unpause} />
    )
    const ivan = (<Ivan 
      _activateSettings={this._activateSettings}
      _deactivateSettings={this._deactivateSettings}
      _pause={this._pause}
      settings={this.state.settings} />
    )

    return (
      <View style={{
          flex: 1, 
          flexDirection: this.state.orientation == 'landscape' ? 'row' : 'column', 
          backgroundColor: 'powderblue'
        }}>
        {clouds}
        {rainbow}
        {multipleChoiceQuestion}
        {this.state.settings && settings}
        {ivan}
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

AppRegistry.registerComponent('YouNiVerse', () => App)
