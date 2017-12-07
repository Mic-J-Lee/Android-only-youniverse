import React, { Component } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';

export default class Stripe extends Component {
  
  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => this.props._toggleStripe(this.props.color)} 
                          style={{flex: 4, backgroundColor: this.props.enabled ? this.props.color : 'grey'}} />
        {(this.props.active == false) && <View style={{flex: 1, backgroundColor: 'powderblue'}} />}
      </View>
    );
  }
}


