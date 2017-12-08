import React, { Component } from 'react';
import { View } from 'react-native';
import Stripe from './Stripe'

export default class Rainbow extends Component {
  
  render() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    const fadedColors = ['#ff9999', '#ffdb99', '#ffff99', '#99ffa2', '#adadff', '#ffa3ff']
    let allStripes = []
    for (let i = 0; i < 6; i++) {
      let color = colors[i]
      let fadedColor = fadedColors[i]
      let isEnabled = this.props.rainbow[color]
      allStripes.push(
        <Stripe key={color} 
                identity={color}
                color={isEnabled == true ? color : fadedColor} 
                isActive={this.props.activeColor == color}
                isEnabled={isEnabled}
                _toggleStripe={this.props._toggleStripe} />
      )
    }

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        {allStripes}
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      </View>
    );
  }
}


