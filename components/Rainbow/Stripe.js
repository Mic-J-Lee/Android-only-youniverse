import React, { Component } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';

export default class Stripe extends Component {
  
  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => this.props._toggleStripe(this.props.identity)} 
                          style={{flex: 4, backgroundColor: this.props.color}} />
        {(this.props.isActive == false) && <View style={{flex: 1, backgroundColor: 'powderblue'}} />}
        {(this.props.isEnabled == false) && <View style={{flex: 1, backgroundColor: 'powderblue'}} />}
      </View>
    );
  }
}


