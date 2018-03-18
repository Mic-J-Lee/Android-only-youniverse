import React, { Component } from 'react'
import { View } from 'react-native'
import Rainbow from './Rainbow/Rainbow'
import Flashcard from './Flashcard/Flashcard'

export default class RainbowCards extends Component {
  
  render() {
    let p = this.props
    const rainbow = (<Rainbow
      activeColor={p.activeColor}
      rainbow={p.rainbow}
      _toggleStripe={p._toggleStripe.bind(this)}
      _activateStripe={p._activateStripe.bind(this)}
      orientation={p.orientation} />
    )
    const flashcard = (<Flashcard
      cards={p.cards}
      rainbow={p.rainbow}
      orientation={p.orientation}
      correctCard={p.correctCard}
      activeColor={p.activeColor}
      _nextColor={p._nextColor}
      _wrongGuess={p._wrongGuess}
      wrongGuesses={p.wrongGuesses}
      status={p.status} />
    )
    return (
      <View style={{flex: 1, flexDirection: p.orientation == 'landscape' ? 'row' : 'column'}}>
        {rainbow}
        {flashcard}
      </View>
    );
  }
}


