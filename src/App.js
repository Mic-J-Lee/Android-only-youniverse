import React, { Component } from 'react'
import { Alert, Animated, AppRegistry, Dimensions, Easing, View } from 'react-native'
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
    this.cloud1 = new Animated.Value(-400)
    this.cloud2 = new Animated.Value(-400)
    this.cloud3 = new Animated.Value(-400)
    this.cloud1y = new Animated.Value(100)
    this.cloud2y = new Animated.Value(200)
    this.cloud3y = new Animated.Value(300)
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

  float(cloud, cloudy) {
    cloudy.setValue(Dimensions.get('screen').height * Math.random())
    cloud.setValue(600)
    Animated.timing(
      cloud,
      {
        toValue: -650,
        useNativeDriver: true,
        duration: Math.random() * (100000 - 10000) + 10000,
        easing: Easing.ease
      }
    ).start(() => this.float(cloud, cloudy))
  }

  componentDidMount() {
    this.float(this.cloud1, this.cloud1y)
    this.float(this.cloud2, this.cloud2y)
    this.float(this.cloud3, this.cloud3y)
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
      activeColor={this.state.activeColor}
      _nextColor={this._nextColor}
      orientation={this.state.orientation} />
    )

    return (
      <View style={{flex:1, flexDirection: this.state.orientation == 'landscape' ? 'row' : 'column', backgroundColor: 'powderblue'}}>
        <Animated.Image source={require('./assets/pictures/cloud1.png')} style={{height:120, position:'absolute', transform: [{translateX: this.cloud1}, {translateY: this.cloud1y}] }} resizeMode='contain' />
        <Animated.Image source={require('./assets/pictures/cloud2.png')} style={{height:130, position:'absolute', transform: [{translateX: this.cloud2}, {translateY: this.cloud2y}] }} resizeMode='contain' />
        <Animated.Image source={require('./assets/pictures/cloud3.png')} style={{height:230, position:'absolute', transform: [{translateX: this.cloud3}, {translateY: this.cloud3y}] }} resizeMode='contain' />
        {rainbowElement}
        {multipleChoiceQuestion}
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
