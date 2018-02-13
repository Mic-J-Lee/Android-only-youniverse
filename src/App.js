import React, { Component } from 'react'
import { Alert, AppRegistry, Dimensions, LayoutAnimation, UIManager, View } from 'react-native'
import Ivan from './components/Ivan/Ivan'
import Menu from './components/Menu/Menu'
import Cloud from './components/Cloud/Cloud'
import Rainbow from './components/Rainbow/Rainbow'
import Flashcard from './components/Flashcard/Flashcard'

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
      dimensions: dim,
      rainbow: {
        red: true,
        orange: true,
        yellow: true,
        green: true,
        blue: true,
        purple: true
      },
      activeColor: 'red',
      status: 'ready',
      menu: false
    }
  }

  _activateStripe(color) {
    if (this.state.rainbow[color] && this.state.activeColor != color) {
      this.setState({activeColor: color})
    }
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

  _pause = () => {
    this.setState({status:'paused'})
  }

  _unpause = () => {
    this.setState({status:'ready'})
  }

  _enterMenu = () => {
    this.setState({menu:'active'})
  }

  _exitMenu = () => {
    if (this.state.menu == 'leaving') this.setState({menu:false})
    if (this.state.menu == 'active') this.setState({menu:'leaving'})
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
    this.setState({activeColor: colors[nextColor]})
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
    const flashcard = (<Flashcard
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
    const menu = (<Menu 
      menu={this.state.menu}
      _exitMenu={this._exitMenu}
      _unpause={this._unpause} />
    )
    const ivan = (<Ivan 
      _enterMenu={this._enterMenu}
      _exitMenu={this._exitMenu}
      _pause={this._pause}
      dimensions={this.state.dimensions}
      menu={this.state.menu} />
    )

    return (
      <View style={{
          flex: 1,
          flexDirection: this.state.orientation == 'landscape' ? 'row' : 'column',
          backgroundColor: 'powderblue'
        }}>
        {clouds}
        {rainbow}
        {flashcard}
        {this.state.menu && menu}
        {ivan}
      </View>
    )
  }
}

AppRegistry.registerComponent('YouNiVerse', () => App)
