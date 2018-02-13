import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class SpeechBubble extends Component {

  render() {

    return (
      <View>
        <Text style={{
          color: 'white',
          backgroundColor: 'black',
          alignSelf: 'flex-start',
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 15,
          padding: 5,
          maxWidth: this.props.width/2 - 10,
          fontSize: 20
          }} >{this.props.ivanSays}</Text>
      </View>
    )
  }
}


