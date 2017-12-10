import React, { Component } from 'react'
import { Alert, AppRegistry, Dimensions, View } from 'react-native'
import Rainbow from './components/Rainbow/Rainbow'
import MultipleChoiceQuestion from './components/MultipleChoice/MultipleChoiceQuestion'


export default class App extends Component {
  constructor() {
    super()
    let dim = Dimensions.get('screen')
    this.state = {
      activeColor: 'red',
      rainbow: {
        red: true,
        orange: true,
        yellow: true,
        green: true,
        blue: true,
        purple: true
      },
      cards: initialCards,
      orientation: dim.height > dim.width ? 'portrait' : 'landscape'
    }
    Dimensions.addEventListener('change', () => {
      dim = Dimensions.get('screen')
      this.setState({
          orientation: dim.height > dim.width ? 'portrait' : 'landscape'
      })
    })
  }

  drawSixCards = () => {
    //access database, obtain one correct card and five dummies
    shuffledCards = initialCards.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1])
    this.setState({
      cards: shuffledCards
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
    } else
      this.setState({rainbow: rainbowClone})
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
    this.setState({activeColor: colors[nextColor]})
    this.drawSixCards()
  }

  render() {
    const rainbowElement = (<Rainbow 
      activeColor={this.state.activeColor} 
      rainbow={this.state.rainbow} 
      _toggleStripe={this._toggleStripe.bind(this)} 
      orientation={this.state.orientation} />
    )
    const multipleChoiceQuestion = (<MultipleChoiceQuestion
      cards={this.state.cards}
      mode={this.state.activeColor}
      _nextColor={this._nextColor}
      orientation={this.state.orientation} />
    )

    return (
      <View style={{flex:1, flexDirection: this.state.orientation == 'landscape' ? 'row' : 'column'}}>
        {rainbowElement}
        <View style={{flex: 11, backgroundColor: 'powderblue'}}>
          {multipleChoiceQuestion}
        </View>
        <View style={[{flex:1, backgroundColor: 'powderblue'}]} />
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
