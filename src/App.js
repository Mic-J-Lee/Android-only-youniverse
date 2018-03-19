import React, { Component } from 'react'
import { Alert, AppRegistry, Dimensions, LayoutAnimation, UIManager, View, Text } from 'react-native'
import Ivan from './components/Ivan/Ivan'
import Menu from './components/Menu/Menu'
import Clouds from './components/Clouds/Clouds'
import Rainbow from './components/RainbowCards/Rainbow/Rainbow'
import RainbowCards from './components/RainbowCards/RainbowCards'
import Flashcard from './components/RainbowCards/Flashcard/Flashcard'
import { UserSchema, GameSchema } from './Schema'

const Realm = require('realm')

export default class App extends Component {

  state = {
    realm:       null,
    rainbow:     {},
    activeColor: 'red',
    status:      'ready',
    menu:        false,
    dimensions:  {}
  }

  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    let dimensions = Dimensions.get('screen')
    Dimensions.addEventListener('change', () => {
      dimensions = Dimensions.get('screen')
      this.setState({ dimensions })
    })
    Realm.open({
deleteRealmIfMigrationNeeded: true, //        MUST REMOVE THIS LINE IN PRODUCTION!!!!!!!!!
      schema: [ UserSchema, GameSchema ]
    }).then(realm => {
      realm.write(() => {
        !realm.objects('Game')[0] && realm.create('Game', {})
        // users = realm.objects('User')
        // for (let user of users) realm.delete(user)
      })
      this.setState({ realm, dimensions })
      this.setState({
        rainbow: {
          red:    realm.objects('Game')[0].red,
          orange: realm.objects('Game')[0].orange,
          yellow: realm.objects('Game')[0].yellow,
          green:  realm.objects('Game')[0].green,
          blue:   realm.objects('Game')[0].blue,
          purple: realm.objects('Game')[0].purple
        }
      })
      if (!this.state.rainbow[this.state.activeColor]) this._nextColor()
    })
  }

  _activateStripe(color) {
    if (this.state.status == 'paused') return
    if (this.state.rainbow[color] && this.state.activeColor != color) {
      this.setState({activeColor: color})
    }
  }

  _toggleStripe(color) {
    if (this.state.status == 'paused') return
    let rainbowClone = {...this.state.rainbow}
    rainbowClone[color] = !rainbowClone[color]
    if (!Object.values(rainbowClone).includes(true))
      Alert.alert('You must have at least 1 active color!')
    else if (color == this.state.activeColor) {
      this._nextColor()
      this.setState({rainbow: rainbowClone})
      this.state.realm.write(()=>{
        this.state.realm.objects('Game')[0][color] = rainbowClone[color]
      })
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      this.setState({rainbow: rainbowClone})
      this.state.realm.write(()=>{
        this.state.realm.objects('Game')[0][color] = rainbowClone[color]
      })
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
    const current = colors.indexOf(this.state.activeColor)
    let next = 0
    if (current != 5) next = current + 1
    let nextColorIsFound = false
    while (nextColorIsFound == false) {
      if (this.state.rainbow[colors[next]] == true)
        nextColorIsFound = true
      else if (next == 5)
        next = 0
      else
        next++
    }
    this.setState({activeColor: colors[next]})
  }

  render() {
    let info = ('game.introStatus = ' + (this.state.realm && this.state.realm.objects('Game')[0].introStatus))
    let orientation = (this.state.dimensions.height > this.state.dimensions.width ? 'portrait' : 'landscape')
    const rainbowCards = (<RainbowCards
      _activateStripe={this._activateStripe.bind(this)}
      _nextColor={this._nextColor}
      _toggleStripe={this._toggleStripe.bind(this)}
      activeColor={this.state.activeColor}
      orientation={orientation}
      rainbow={this.state.rainbow}
      status={this.state.status} />
    )
    const menu = (<Menu
      _exitMenu={this._exitMenu}
      _unpause={this._unpause}
      menu={this.state.menu} />
    )
    const ivan = (<Ivan
      _enterMenu={this._enterMenu}
      _exitMenu={this._exitMenu}
      _pause={this._pause}
      dimensions={this.state.dimensions}
      menu={this.state.menu}
      realm={this.state.realm} />
    )

    return (
      <View style={{
          flex: 1,
          flexDirection: orientation == 'landscape' ? 'row' : 'column',
          backgroundColor: 'powderblue'
        }}>
        <Clouds />
        {rainbowCards}
        {this.state.menu && menu}
        {ivan}
      </View>
    )
  }
}

AppRegistry.registerComponent('YouNiVerse', () => App)
