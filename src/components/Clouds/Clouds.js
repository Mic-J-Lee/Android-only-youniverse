import React, { Component } from 'react'
import { View } from 'react-native'
import Cloud from './Cloud'

export default class Clouds extends Component {
 
  render() {

    return (
      <View>
        <Cloud image={'cloud1'} size={120} />
        <Cloud image={'cloud2'} size={130} />
        <Cloud image={'cloud3'} size={230} />
      </View>
    )
  }
}


