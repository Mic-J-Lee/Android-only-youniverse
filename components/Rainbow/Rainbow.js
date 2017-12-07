import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Stripe from './Stripe'

export default class Rainbow extends Component {
  constructor(props) {
    super();
    this.state = {
      rainbowStatus: props.rainbowStatus
    };
  }
  render() {
    const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    let allStripes = []
    for (color of rainbow) {
      allStripes.push(<Stripe key={color} 
        color={this.state.rainbowStatus[color]['enabled'] == true ? color : 'black'} 
        active={this.state.rainbowStatus[color]['active']}
        enabled={this.state.rainbowStatus[color]['enabled']}
        _toggleStripe={this.props._toggleStripe} />)
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


