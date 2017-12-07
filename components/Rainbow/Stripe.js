import React, { Component } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';

export default class Stripe extends Component {
  constructor(props) {
    super();
    this.state = {
      enabled: props.enabled
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => this.props._toggleStripe(this.props.color)} 
                          style={{flex: 4, backgroundColor: this.props.color}} />
        {(this.props.active == false) && <View style={{flex: 1, backgroundColor: 'powderblue'}} />}
      </View>
    );
  }
}


