import React, { Component } from 'react'
import { View } from 'react-native'
import Stripe from './Stripe'

export default class Rainbow extends Component {
  
  render() {
    const p = this.props
    const portrait = p.orientation == 'portrait'
    let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    let fadedColors = ['#ff9999', '#ffdb99', '#ffff99', '#99ffa2', '#adadff', '#ffa3ff']
    if (!portrait) {
      colors = colors.reverse()
      fadedColors = fadedColors.reverse()
    }
    let allStripes = []
    for (let i = 0; i < colors.length; i++) {
      let color = colors[i]
      let fadedColor = fadedColors[i]
      let isEnabled = p.rainbow[color]
      allStripes.push(
        <Stripe key={color} 
                color={color}
                displayedColor={isEnabled == true ? color : fadedColor} 
                isActive={p.activeColor == color}
                isEnabled={isEnabled}
                _toggleStripe={p._toggleStripe}
                _activateStripe={p._activateStripe}
                orientation={p.orientation} />
      )
    }

    return (
      <View style={{flex: 2, flexDirection: portrait ? 'row' : 'column'}}>
        <View style={{flex: 1}} />
        {allStripes}
        <View style={{flex: 1}} />
      </View>
    );
  }
}


