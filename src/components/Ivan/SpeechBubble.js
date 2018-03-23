import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class SpeechBubble extends Component {

  render() {
    const p = this.props
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
          maxWidth: p.width/2 - 10,
          fontSize: 20
          }} >{p.ivanSays}</Text>
      </View>
    )
  }
}


